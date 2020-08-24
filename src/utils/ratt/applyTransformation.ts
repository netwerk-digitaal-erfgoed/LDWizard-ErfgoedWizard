import Ratt from "@triply/ratt";
import fromArray from "@triply/ratt/lib/middlewares/reading/fromArray";
import { Util, NamedNode } from "n3";
import toNtriplesString from "./middlewares/toNtriplesString";
import { ApplyTransformation } from "Definitions";
import { cleanHeaderName } from "../helpers";

const applyTransformation: ApplyTransformation = async (opts) => {
  if (opts.type === "ratt" && Array.isArray(opts.source)) {
    const baseIri = Util.prefix(opts.config.baseIri);
    const app = new Ratt();

    const getColumnConfig = (colName: string) =>
      opts.config.columnConfiguration.find((col) => col.columnName === colName);

    // Load from supplied array
    app.use(fromArray(opts.source));

    let rowCount = 0;
    const keyColumn = opts.config.key ?? -1;
    app.use((ctx, next) => {
      const subject = baseIri(
        keyColumn >= 0
          ? cleanHeaderName(ctx.record[opts.config.columnConfiguration[keyColumn].columnName].value)
          : "" + rowCount
      );

      for (const col in ctx.record) {
        if (ctx.record[col] && ctx.record[col].value.length > 0) {
          const colConf = getColumnConfig(col);
          if (!colConf) continue;
          const predicate = colConf.propertyIri ? new NamedNode(colConf.propertyIri) : baseIri(cleanHeaderName(col));
          ctx.store.addQuad(subject, predicate, ctx.record[col]);
        }
      }
      ctx.store.addQuad(
        subject,
        ctx.app.prefix["rdf"]("type"),
        typeof opts.config.baseIri === "string" ? new NamedNode(opts.config.resourceClass) : opts.config.baseIri
      );
      rowCount++;
      return next(ctx.record, ctx.store);
    });
    const { mw, end } = toNtriplesString();
    app.use(mw);
    await app.run();
    return end();
  } else {
    throw new Error("Not supported");
  }
};
export default applyTransformation;
