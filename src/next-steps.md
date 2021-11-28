# Next steps

- Endpoint (service?) for introducing patients `ptid` (GET) <--- GET THE IMAGES (filter: toData, fromData, patients[]) (16/11) OK!
- Endpoint for getting the possible `brainParts` (17/11) OK!
- Endpoint that returns disponible patients, filtered by: (GET)
  - ADNI version? (ADNI1, ADNI2, ADNIGO) <---- ADD TO ENTITY AND TABLE (16/11) OK!
  - Date range
  - Ages when studied was done <---- age at the beginnig, age at the end of the study?
  - Diagnosis (multiselection)

## After that

Build the new csv from the phenotypes recolected (~25/11): OK

- Endpoint POST that send filter (brain parts, patients, date range, diagnosis) and generates the csv, with the next structure. OK

### CSV structure

AND
download the file (~25/11) OK

## Finally web

Simple web with petitions:

- file selector (~5/12)
- file download (~10/12)

# Contact Elvira

(~11/12) u.u

# Documentation

(~13/12)

# DEMOG

Uniqueness on Phase and Rid <- NO, RID unique accrosss `Phase`

Hacer columnas nullables :) and ready! Actualizar solo con valores no nulos, sino pisan los correctos
