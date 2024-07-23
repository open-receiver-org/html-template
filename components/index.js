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
        <header class="px-8 max-w-none flex items-center justify-between bg-gray-800 text-white text-center">
          <a href="https://open-receiver.org/" class="flex items-center space-x-2 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="flowbite Logo">
              <span class="self-center text-2xl dark:text-white"><object data="" type=""></object>open-receiver.org</span>
          </a>
          <div class="flex p-4 space-x-2 md:space-x-0 rtl:space-x-reverse" id="navbar-sticky">
              <!-- <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"> -->

            <ul class="flex flex-col p-4 md:p-0 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800">
              <li>
                <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-600 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-800 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-800">About</a>
              </li>
              <li>
                <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-800 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-800">Services</a>
              </li>
              <li>
                <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-800 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-800">Contact</a>
              </li>
            </ul>
          </div>
          <div class="flex space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" class="text-white bg-blue-600 hover:bg-blue-400 rounded focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>  
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
