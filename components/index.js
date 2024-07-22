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
    .header-img {
      height: 100px
    }

    .topnav {
      overflow: hidden;
      background-color: #333;
    }

    .topnav a {
      float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }

    .topnav a.active {
      background-color: #04AA6D;
      color: white;
    }
  </style>
    <head>
      <meta charset="UTF-8">
      ${basehref}
       <title>${asyncapi.info().title()} ${asyncapi
      .info()
      .version()} Documentation</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="icon" type="image/x-icon" href="${favicon}" />
      ${styling}
    </head>
    <body>
      <div class="row topnav">
        <div class="col-md-4">
          <a href="/"><img src="template/../../../static/assets/img/logo.png" alt="logo" height="100" /></a>
        </div>
        <div class="col-md-8">
            <h1>${asyncapi.info().title()}</h1>
        </div>
      </div>
      <div id="root">${renderedSpec}</div>
  
      ${asyncapiScript}
  
      <script>
        const schema = ${stringifySpec(asyncapi)};
        const config = ${stringifyConfiguration(params)};
        AsyncApiStandalone.hydrate({ schema, config }, document.getElementById("root"));
      </script>
      <footer>
      <div class="custom-footer">
        <p>&copy; 2024 open-receiver. All rights reserved.</p>
        <p>Contact us at <a href="mailto:support@open-receiver.org">support@open-receiver.org</a></p>
      </div>
    </footer>
    </body>
  </html>`;
}