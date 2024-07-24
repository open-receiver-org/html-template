// eslint-disable-next-line no-unused-vars
import { AsyncAPIDocumentInterface } from "@asyncapi/parser";
import {
  includeFile,
  generateBase64Favicon,
  renderSpec,
  stringifySpec,
  stringifyConfiguration,
} from "../helpers/all";

/**
 * @param {{asyncapi: AsyncAPIDocumentInterface, params: any}} param0
 */
export function Index({ asyncapi, params = {} }) {
  const favicon = generateBase64Favicon(params);
  const renderedSpec = renderSpec(asyncapi, params);
  let asyncapiScript = `<script src="js/asyncapi-ui.min.js" type="application/javascript"></script>`;
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
  return `<!DOCTYPE html>
  <html lang="en">
    <style>
      .justify-between {
        justify-content: space-between;
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
        .nav-list {
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/x-icon" href="${favicon}" />
      ${styling}
    </head>
  
    <body>
        <section class="aui-root">
          <header class="h-16 panel--center px-8 w-full flex items-center justify-between bg-gray-800 text-white md:flex">
            <a href="https://open-receiver.org/" class="flex items-center space-x-2 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="flowbite Logo">
              <span class="self-center text-2xl dark:text-white"><object data="" type=""></object>open-receiver.org</span>
            </a>

            <div class="nav-list bg-gray-800">
              <ul class="flex p-4 md:p-0 font-medium">
                <li>
                  <a href="/" class="block px-3">Home</a>
                </li>
                <li>
                  <a href="/" class="block px-3">About</a>
                </li>
                <li>
                  <a href="/" class="block px-3">Service</a>
                </li>
                <li>
                  <a href="/" class="block px-3">Contact</a>
                </li>
              </ul>
            </div>
            <div class="nav-list bg-gray-800">
              <button type="button"
              class="text-white bg-blue-600 hover:bg-blue-400 rounded focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get started
             </button>
            </div>
            <div class="burger" id="burger">
              <svg viewBox="0 0 100 70" width="40" height="30" class="fill-current text-gray-200">
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
              </svg>
            </div>
            </button>
            </div>
            </div>
          </header>
        </section>
     <div id="root">
      ${renderedSpec}      
 
  
      ${asyncapiScript}
      <section class="aui-root">
        <footer class="py-5 bg-gray-800 text-center text-white">
          Tailwind is Awesome 😎
        </footer>
      </section>

      <script>
        const schema = ${stringifySpec(asyncapi)};
        const config = ${stringifyConfiguration(params)};
        AsyncApiStandalone.hydrate({ schema, config }, document.getElementById("root"));
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
