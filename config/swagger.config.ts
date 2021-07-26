import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 
export const SwaggerConfig = {
 setup(app: INestApplication) {
   const options = new DocumentBuilder()
     .setTitle('Adni Data Phenotypes Extractor')
     .setDescription(
       "Get access to the patient's health trackings, records, and communicate with them <br/>" +
         '[adni](http://adni.loni.usc.edu/) </br>'
     )
     .setVersion('1.0')
     .addBearerAuth()
     .build();
   const document = SwaggerModule.createDocument(app, options, {});
   SwaggerModule.setup('api', app, document);
   // serve the docs att `<base-url>/api` and `<base-url>/api-json`
 },
};
