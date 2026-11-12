<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

License
-------

This library written by Torben Sickert stands under a creative commons naming
4.0 international license.
See https://creativecommons.org/licenses/by/4.0/deed.de
endregion -->

<!--|deDE:Projektstatus-->
<!--|frFR:État du projet-->
Project status
--------------

[![npm](https://img.shields.io/npm/v/prerenderwebnodeplugin?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d&style=for-the-badge)](https://www.npmjs.com/package/prerenderwebnodeplugin)
[![npm downloads](https://img.shields.io/npm/dy/prerenderwebnodeplugin.svg?style=for-the-badge)](https://www.npmjs.com/package/prerenderwebnodeplugin)

[![build](https://img.shields.io/github/actions/workflow/status/thaibault/pre-render-web-node-plugin/build.yaml?style=for-the-badge)](https://github.com/thaibault/pre-render-web-node-plugin/actions/workflows/build.yaml)
[![build push package](https://img.shields.io/github/actions/workflow/status/thaibault/pre-render-web-node-plugin/build-package-and-push.yaml?label=build%20push%20package&style=for-the-badge)](https://github.com/thaibault/pre-render-web-node-plugin/actions/workflows/build-package-and-push.yaml)

[![check types](https://img.shields.io/github/actions/workflow/status/thaibault/pre-render-web-node-plugin/check-types.yaml?label=check%20types&style=for-the-badge)](https://github.com/thaibault/pre-render-web-node-plugin/actions/workflows/check-types.yaml)
[![lint](https://img.shields.io/github/actions/workflow/status/thaibault/pre-render-web-node-plugin/lint.yaml?label=lint&style=for-the-badge)](https://github.com/thaibault/pre-render-web-node-plugin/actions/workflows/lint.yaml)
[![test](https://img.shields.io/github/actions/workflow/status/thaibault/pre-render-web-node-plugin/test-coverage-report.yaml?label=test&style=for-the-badge)](https://github.com/thaibault/pre-render-web-node-plugin/actions/workflows/test-coverage-report.yaml)

[![code coverage](https://img.shields.io/coverallsCoverage/github/thaibault/pre-render-web-node-plugin?label=code%20coverage&style=for-the-badge)](https://coveralls.io/github/thaibault/pre-render-web-node-plugin)

[![deploy web documentation](https://img.shields.io/github/actions/workflow/status/thaibault/pre-render-web-node-plugin/deploy-web-documentation.yaml?label=deploy%20web%20documentation&style=for-the-badge)](https://github.com/thaibault/pre-render-web-node-plugin/actions/workflows/deploy-web-documentation.yaml)
[![web documentation](https://img.shields.io/website-up-down-green-red/https/tsickert.com/pre-render-web-node-plugin.svg?label=web-documentation&style=for-the-badge)](https://tsickert.com/pre-render-web-node-plugin)

<!--|deDE:Einsatzmöglichkeiten-->
<!--|frFR:Cas d'utilisation-->
Use case
--------

This [web-node](https://tsickert.com/web-node) plugin runs pre-render scripts
of your application, e.g. to generate static HTML snapshots of a single page
application for search engines or faster first page loads. You provide the
scripts, the plugin finds, runs and cleans up after them.
<!--deDE:
    Dieses [web-node](https://tsickert.com/web-node)-Plugin führt
    Pre-Render-Skripte Ihrer Anwendung aus, z. B. um statische
    HTML-Schnappschüsse einer Single-Page-Application für Suchmaschinen oder
    schnellere erste Seitenaufrufe zu erzeugen. Sie stellen die Skripte
    bereit, das Plugin findet sie, führt sie aus und räumt danach auf.
-->
<!--frFR:
    Ce plugin [web-node](https://tsickert.com/web-node) exécute les scripts
    de pré-rendu de votre application, par exemple pour générer des instantanés
    HTML statiques d'une application monopage pour les moteurs de recherche ou
    un premier chargement plus rapide. Vous fournissez les scripts, le plugin
    les trouve, les exécute et nettoie ensuite.
-->

Features included:
<!--deDE:Enthaltene Funktionen:-->
<!--frFR:Fonctionnalités incluses:-->

- Finds pre-render scripts by file name anywhere in your application.<!--deDE:Findet Pre-Render-Skripte anhand ihres Dateinamens überall in Ihrer Anwendung.--><!--frFR:Trouve les scripts de pré-rendu par leur nom de fichier partout dans votre application.-->
- Runs them in parallel, each in its own directory.<!--deDE:Führt sie parallel aus, jedes in seinem eigenen Verzeichnis.--><!--frFR:Les exécute en parallèle, chacun dans son propre répertoire.-->
- Removes generated output directories on shutdown.<!--deDE:Entfernt erzeugte Ausgabeverzeichnisse beim Beenden.--><!--frFR:Supprime les répertoires de sortie générés à l'arrêt.-->
- Hooks to change the list of scripts and their command line arguments.<!--deDE:Hooks, um die Liste der Skripte und ihre Kommandozeilenargumente zu ändern.--><!--frFR:Hooks permettant de modifier la liste des scripts et leurs arguments de ligne de commande.-->

<div class="wd-table-of-contents">
    <h2 id="content">Content<!--deDE:Inhalt--><!--frFR:Contenu--></h2>
    <!--wd-table-of-contents-->
</div>

Installation
------------

Install the plugin next to web-node. web-node discovers every installed
package whose name ends with "-web-node-plugin" automatically:
<!--deDE:
    Installieren Sie das Plugin neben web-node. web-node erkennt jedes
    installierte Paket, dessen Name auf "-web-node-plugin" endet,
    automatisch:
-->
<!--frFR:
    Installez le plugin à côté de web-node. web-node détecte automatiquement
    chaque paquet installé dont le nom se termine par "-web-node-plugin":
-->

```bash
yarn add web-node pre-render-web-node-plugin
```

<!--|deDE:Beispiel-->
<!--|frFR:Exemple-->
Example
-------

Add an executable script named "preRender.js" (or "pre-render.js",
"preRenderer.js", "pre-renderer.js") to your application. The plugin runs it
via the shell from its own directory. The last argument tells whether a cache
may be used ("true" or "false"). Write the results to a directory named
"preRendered":
<!--deDE:
    Legen Sie ein ausführbares Skript namens "preRender.js" (oder
    "pre-render.js", "preRenderer.js", "pre-renderer.js") in Ihrer Anwendung
    an. Das Plugin führt es über die Shell aus seinem eigenen Verzeichnis
    heraus aus. Das letzte Argument gibt an, ob ein Cache verwendet werden
    darf ("true" oder "false"). Schreiben Sie die Ergebnisse in ein
    Verzeichnis namens "preRendered":
-->
<!--frFR:
    Ajoutez à votre application un script exécutable nommé "preRender.js" (ou
    "pre-render.js", "preRenderer.js", "pre-renderer.js"). Le plugin l'exécute
    via le shell depuis son propre répertoire. Le dernier argument indique si
    un cache peut être utilisé ("true" ou "false"). Écrivez les résultats dans
    un répertoire nommé "preRendered":
-->

```JavaScript
#!/usr/bin/env node
import('fs/promises').then(async ({mkdir, writeFile}) => {
    await mkdir('preRendered', {recursive: true})
    await writeFile('preRendered/index.html', '<h1>Pre-rendered</h1>')
})
```

```bash
chmod +x preRender.js
```

Enable rendering on startup and after configuration updates in your
application's "package.json":
<!--deDE:
    Aktivieren Sie das Rendern beim Start und nach Konfigurationsänderungen in
    der "package.json" Ihrer Anwendung:
-->
<!--frFR:
    Activez le rendu au démarrage et après chaque mise à jour de la
    configuration dans le "package.json" de votre application:
-->

```JSON
{
    "webNode": {
        "preRender": {
            "renderAfterConfigurationUpdates": true
        }
    }
}
```

Without this option nothing runs automatically. Other plugins can then
trigger it via "services.preRender.render(state)".
<!--deDE:
    Ohne diese Option läuft nichts automatisch. Andere Plugins können es dann
    über "services.preRender.render(state)" auslösen.
-->
<!--frFR:
    Sans cette option, rien ne s'exécute automatiquement. D'autres plugins
    peuvent alors le déclencher via "services.preRender.render(state)".
-->

<!--|deDE:Konfiguration-->
<!--|frFR:Configuration-->
Configuration
-------------

All options live below "webNode.preRender":
<!--deDE:Alle Optionen liegen unterhalb von "webNode.preRender":-->
<!--frFR:Toutes les options se trouvent sous "webNode.preRender":-->

- "locations.executer.fileNames": File names of pre-render scripts.<!--deDE:"locations.executer.fileNames": Dateinamen der Pre-Render-Skripte.--><!--frFR:"locations.executer.fileNames": Noms de fichier des scripts de pré-rendu.-->
- "locations.executer.include" and "locations.executer.exclude": Directories
  to search and to skip. "node_modules", "src", "log", "database" and similar
  folders are excluded by default.<!--deDE:"locations.executer.include" und "locations.executer.exclude": Zu durchsuchende und auszulassende Verzeichnisse. "node_modules", "src", "log", "database" und ähnliche Ordner sind standardmäßig ausgeschlossen.--><!--frFR:"locations.executer.include" et "locations.executer.exclude": Répertoires à parcourir et à ignorer. "node_modules", "src", "log", "database" et des dossiers similaires sont exclus par défaut.-->
- "locations.output.directoryNames": Names of output directories below each
  script which are removed on shutdown. Defaults to "preRendered".<!--deDE:"locations.output.directoryNames": Namen der Ausgabeverzeichnisse unterhalb jedes Skripts, die beim Beenden entfernt werden. Standardmäßig "preRendered".--><!--frFR:"locations.output.directoryNames": Noms des répertoires de sortie sous chaque script, supprimés à l'arrêt. Par défaut "preRendered".-->
- "locations.output.exclude": Paths below a script to keep on shutdown.<!--deDE:"locations.output.exclude": Pfade unterhalb eines Skripts, die beim Beenden erhalten bleiben.--><!--frFR:"locations.output.exclude": Chemins sous un script conservés à l'arrêt.-->
- "cache": Value passed as last argument to each script. Defaults to "false".<!--deDE:"cache": Wert, der jedem Skript als letztes Argument übergeben wird. Standardmäßig "false".--><!--frFR:"cache": Valeur transmise comme dernier argument à chaque script. Par défaut "false".-->
- "renderAfterConfigurationUpdates": Run on startup and after each
  configuration change. Defaults to "false".<!--deDE:"renderAfterConfigurationUpdates": Beim Start und nach jeder Konfigurationsänderung ausführen. Standardmäßig "false".--><!--frFR:"renderAfterConfigurationUpdates": Exécuter au démarrage et après chaque modification de la configuration. Par défaut "false".-->

<!--|deDE:Hooks und Dienste-->
<!--|frFR:Hooks et services-->
Hooks and services
------------------

- "prePreRendererRender": Receives and returns the list of found scripts.<!--deDE:"prePreRendererRender": Erhält die Liste der gefundenen Skripte und gibt sie zurück.--><!--frFR:"prePreRendererRender": Reçoit et retourne la liste des scripts trouvés.-->
- "prePreRendererCLIParameter": Receives and returns the arguments for each
  script.<!--deDE:"prePreRendererCLIParameter": Erhält die Argumente für jedes Skript und gibt sie zurück.--><!--frFR:"prePreRendererCLIParameter": Reçoit et retourne les arguments de chaque script.-->
- "postPreRendererRender": Runs after all scripts finished.<!--deDE:"postPreRendererRender": Läuft, nachdem alle Skripte beendet sind.--><!--frFR:"postPreRendererRender": S'exécute une fois tous les scripts terminés.-->
- "services.preRender.render(state)": Runs all scripts. Additional arguments
  can be given as "state.data".<!--deDE:"services.preRender.render(state)": Führt alle Skripte aus. Zusätzliche Argumente können als "state.data" übergeben werden.--><!--frFR:"services.preRender.render(state)": Exécute tous les scripts. Des arguments supplémentaires peuvent être fournis via "state.data".-->
- "services.preRender.renderFile(path, arguments)": Runs a single script.<!--deDE:"services.preRender.renderFile(path, arguments)": Führt ein einzelnes Skript aus.--><!--frFR:"services.preRender.renderFile(path, arguments)": Exécute un seul script.-->

<!--|deDE:Entwicklung-->
<!--|frFR:Développement-->
Development
-----------

```bash
yarn install
yarn build
yarn test
```
