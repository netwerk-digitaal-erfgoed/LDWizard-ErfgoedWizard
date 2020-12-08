# Erfgoeddata als Linked Data met behulp van de LDWizard

De [Kracht van Linked Data](https://www.youtube.com/watch?v=rJPhNTw7u4U) is dat losse datasets via het web aan elkaar kunnen worden gekoppeld. Dit is nu bereikbaar voor iedereen met erfgoeddata dankzij de LDWizard. De enige voorwaarde is dat deze data in Comma Separated Values (CSV) formaat beschikbaar is. En alle database- en spreadsheetprogramma's (zoals MS Access en MS Excel) hebben de mogelijkheid om de data in dit formaat op te slaan.

Voor erfgoeddata die in CSV-formaat beschikbaar is, kun je gebruik maken van de online LDWizard om deze te converteren naar Linked Data. De eerste stap daarbij is dat je het CSV-bestand in de applicatie upload. Vervolgens configureer je de manier waarop de erfgoeddata kan worden omgezet naar Linked Data. In deze configuratiestap leg je vast welke kolom (met een unieke waarde) een rij identificeert en wat er in het CSV-bestand is beschreven, bijvoorbeeld een persoon of een kunstwerk. Daarna bepaal je per kolom welke standaard-eigenschap ('property') van de persoon of kunstwerk het beste overeenkomt met de data in de kolom. In de derde stap kun je het resultaat in Linked Data formaat (Resource Description Framework, RDF) downloaden en bekijken. Maar je kunt het ook publiceren in een online Linked Data database om het daar te bekijken. (Voor dat laatste heb je wel toegang tot een Linked Data database nodig.) Ten slotte kun je er ook voor kiezen om een conversiescript te downloaden waarmee je jouw Linked Data transformatie verder kunt uitwerken in meer geavanceerde tools (RML, CoW of RATT).

<iframe width="560" height="315" src="https://www.youtube.com/embed/VO61pqKWw7A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<small>Een demonstratie van de werking van de LDWizard voor erfgoed</small>

**[klik hier](./1)** om meteen van start te gaan.

## Achtergrond

De LDWizard is een initiatief van Nederlandse linked data experts uit verschillende domeinen:

- [Netwerk Digitaal Erfgoed (NDE)](https://www.netwerkdigitaalerfgoed.nl/), Enno Meijers & Ivo Zandhuis.
- [Kadaster](https://www.kadaster.nl/), Erwin Folmer.
- [Internationaal Instituut voor Sociale Geschiedenis (IISG)](https://iisg.amsterdam/) and [Clariah](https://www.clariah.nl/), Richard Zijdeman.
- [Triply](https://triply.cc/), Thomas de Groot, Gerwin Bosch & Wouter Beek.

De open source basissoftware en de eerste LDWizard - gericht op erfgoeddata - is gefinancierd door Netwerk Digitaal Erfgoed. Op basis van deze resultaten kunnen ook LDWizards in andere domeinen worden gemaakt. De code is gepubliceerd op [GitHub](https://github.com/netwerk-digitaal-erfgoed/LDWizard/).
