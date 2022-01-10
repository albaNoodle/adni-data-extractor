<p align="center">
<div style="display: flex; align-items: flex-start;">
  <a style="padding: 10px;" href="http://adni.loni.usc.edu/" target="blank"><img src="http://adni.loni.usc.edu/wp-content/themes/freshnews-dev-v2/images/ADNI_logo_vector.png" width="200" alt="ADNI Logo" /></a>
  <a style="padding-top: 20px;"target="blank"><img src="https://www.unizar.es/sites/default/files/logos-unizar/logouz_cmyk_alta_negro-02.png" width="320" alt="Unizar Logo" /></a>
  </div>
</p>
<p align="center">Program for ADNI database data processing.</p>

## Description

A server that provides an API and a simple web applicattion for uploading ADNI data to system and getting that data processed and filtered.

Server has been implemented using [Nest.js](https://docs.nestjs.com/) (version `7.5.3`) framework and web app using [Nuxt](https://nuxtjs.org/docs/get-started/installation) (version `2.15.8`) framework. [Node](https://nodejs.org/es/) version used is `v14.15.0`.

[Yarn](https://yarnpkg.com/getting-started) has been used for node packages administration, but [npm](https://docs.npmjs.com/getting-started) could have been used too.

## Installation

### Server

From `root` directory exec:

```bash
$ yarn install
```

### Web

From `extractor-web` directory exec:

```bash
$ yarn install
```

## Database configuration

Database is congured on the file `config\default.yml` for development environment. File for test environment is `config\test.yml`

This project has been developed using `mysql`(Ver `8.0.27`).

```yml
db:
  type: 'mysql'
  port: 3306
  database: 'adni'
  username: 'root'
  password: ''
```

Parameters can be change so the system can be used with the database manager of any host machine. Depending of the database used it may be needed some changes on entities or migration files.

### Run migrations

For initializing database use next command:

```bash
# Dev env
yarn typeorm migration:run

# Test env
env NODE_ENV=test yarn typeorm migration:run
```

## Running the app

### Running Server

```bash
# development
$ yarn start

# watch mode -> 'http://localhost:3000/' by default
$ yarn start:dev

# production mode - Not available yet
$ yarn start:prod
```

### Running Web App

```bash
# development on watch mode -> 'http://localhost:3001/' by default
$ yarn dev

# build
$ yarn build

# run builded app
$ yarn run
```

## Test

```bash
# unit tests
$ yarn test
```

## Input format files

This system has been develop using files obtained from ADNI without previous processation. So a file from ADNI of any of the uploading types will work.

In case it would be used some modified file, the requisites for each type of input file are the nexts:

### Dictionaries

It must include the next columns:

- `FLDNAME`
- `TEXT`
- `TBLNAME`

### Patients - Demographic file

It must include the next columns:

- `RID`
- `Phase`
- `PTGENDER`
- `PTDOBMM`
- `PTDOBYY`

### Patients - Visit file

It must include the next columns:

- `RID`
- `PTID`
- `Screen.Diagnosis`

### Images

It must include the next columns:

- `IMAGEUID`
- `RID`
- `VISCODE`
- `EXAMDATE`

Phenotypes columns (`ST1SV`, `ST2SV`, etc...) generally must start on column index 22 (starting by 0).
In case of some files, like `ADNIMERGE.csv` file, phenotypes can start at any index but they have to start on the newt column to `IMAGEUID` column.
Last column on the file never is consider a phenotype (`update_stamp` column).

## Output format files

Output file es composed by the first five column as follows:

- `Image.Uid`: Image identifier
- `RID` Patient identifier
- `PTID` Patient PTID is an alternative identifier from RID
- `Diagnosis`: Patient diagnosis. Posible values:
  - NL: Cognitively normal
  - MCI: Mild cognitive impairment
  - AD: Alzheimer's disease
- `VISCODE`: Visit code, represents the visit month of the study. Ex: `m12`, `m06`. `bl` value stands for baseline.
- `EXAMDATE`: Date when image was taken

From column index 5 to last column (starting by 0) there are the phenotypes selected when extracting data.

## API doc

Swagger API doc is available on the route `/api` of the server. For example, running server in local in port 3000, it would be `http://localhost:3000/api`.

## Error `heap out of memory`

When extracting data from a large number of patients of a large number of phenotypes the memory assign to node process may not be enough. In this case an error similar like this appears on server console:

```bash
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

If this situation happens, the solution would be assign more memory for node process with the command:

```bash
export NODE_OPTIONS="--max-old-space-size=8192"
```

## Next Steps

- Optimize code for optimizing memory usage during data extraction.

- Implement test clases properly. API tests are not testing all functionality. Tests for web do not exist.

- Different environments configuration, for deploying the system in a production and/or preproduction enviroment so it can be used on remote machine.

- Use filtered options on `GET` endponits. Some endpoints offer the posibility for getting data filtered (patients filtered by year of birth, brain parts iltered by ADNI phase...). This options are not used in the web by now.

- For uploading users it is mandatory upload a demographic file and a visits file. It would be more usable if API and web allow to upload only one of that files in case it is only that one needed.

- Server and frontend validation for input files (ex: they are csv files, they are not empty, they have the needed headers...).

- Options for customizing output files names.

- Sort phenotype columns when creating output file (ex: alphabetically ordered)

## Stay in touch

- Author - [Alba Clemente](https://www.linkedin.com/in/alba-clemente-villafranca-b00ba9146/)
