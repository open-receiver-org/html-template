// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocumentInterface } from "@asyncapi/parser";
import {
  includeFile,
  generateBase64Favicon,
  renderSpec,
  stringifySpec,
  stringifyConfiguration,
} from "../helpers/all";
import path from 'path';
import * as fs from 'fs';

/**
 * @param {{asyncapi: AsyncAPIDocumentInterface, params: any}} param0
 */
export function Index({ asyncapi, params = {} }) {
  const favicon = generateBase64Favicon(params);
  const renderedSpec = renderSpec(asyncapi, params);
  let asyncapiScript = `<script src="js/asyncapi-ui.min.js" type="application/javascript"></script>`;

  // Integeration of custom OR header
  let header = "<h3 style='color: red;'>ERROR: Could not load HEADER. Please check generator.</h3>";
  const headerPath = path.resolve(__dirname, '../', 'components/header.html');
  header = fs.readFileSync(headerPath).toString()

  if (params?.singleFile) {
    asyncapiScript = `<script type="text/javascript">
    ${includeFile("template/js/asyncapi-ui.min.js")}
    </script>`;
  }
  let styling = `<link href="css/global.min.css" rel="stylesheet">
      <link href="css/asyncapi.min.css" rel="stylesheet">`;
  if (params?.singleFile) {
    styling = `<style type="text/css">
      ${includeFile("template/css/global.min.css")}
      ${includeFile("template/css/asyncapi.min.css")}
    </style>`;
  }
  let basehref = "";
  if (params.baseHref) {
    basehref = `<base href="${params.baseHref}">`;
  }
  return `<!doctype html>
        <html lang="en">
          <style>
            .justify-between {
              justify - content: space-between;
      }

            .sr-only {
              position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
      }

            .burger {
              display: none;
      }

            @media (max-width: 1024px) {
        .nav - list {
              display: none;
            flex-direction: column;
            width: 100%;
            text-align: center;
            background-color: #333;
        }

            .nav-list.active {
              display: flex;
        }

            .burger {
              display: flex;
        }
      }
          </style>
          <style>
            .justify-between {
              justify - content: space-between;
      }

            .sr-only {
              position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
      }

            .burger {
              display: none;
      }

            @media (max-width: 1024px) {
        .nav - list {
              display: none;
            flex-direction: column;
            width: 100%;
            text-align: center;
            background-color: #333;
        }

            .nav-list.active {
              display: flex;
        }

            .burger {
              display: flex;
        }
      }
          </style>
          <head>
            <meta charset="UTF-8">
              ${basehref}
              <title>${asyncapi.info().title()} ${asyncapi
      .info()
      .version()} documentation</title>
              <title>${asyncapi.info().title()} ${asyncapi
      .info()
      .version()} documentation</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="icon" type="image/x-icon" href="${favicon}" />
                ${styling}
              </head>

              <body>
                <section class="aui-root">
                  ${header}
                </section>
                <div id="root">
                  ${renderedSpec}


                  ${asyncapiScript}
                  <section class="aui-root">
                    <footer class="py-5 bg-gray-800 text-center text-white">
                      Tailwind is Awesome 😎
                    </footer>
                  </section>

                  <section class="aui-root">
                    <footer class="py-5 bg-gray-800 text-center text-white">
                      Tailwind is Awesome 😎
                    </footer>
                  </section>

                  <script>
                    const schema = ${stringifySpec(asyncapi)};
                    const config = ${stringifyConfiguration(params)};
                    AsyncApiStandalone.hydrate({schema, config}, document.getElementById("root"));
                  </script>
                  <section class="aui-root">

                    <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
                      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
                      </span>
                      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                          <a href="#" class="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                          <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                          <a href="#" class="hover:underline">Contact</a>
                        </li>
                      </ul>
                    </footer>

                  </section>
              </body>
            </html>`;
}
