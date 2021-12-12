<template>
  <v-container class="doc-container">
    <h2 class="doc-title"> How To Use ADNI data extractor</h2>
    <h3 class="doc-subtitle">1. Upload data</h3>
    <div class="doc-text">
      Upload the different data types in ADNI database by selecting the correspondent file or files
      for each section and clicking on <b>SUBMIT</b> button. <br /><br />
      <ul>
        <li>
          <b>Dictionaries (Phenotypes names)</b>
          <i>Dictionary file</i>
          type is needed for generating the brain parts (name and keyname) objects on the system.
          <br />
          Example:
          <br />
          <p style="margin-left: 40px"> <i>UCSFFSX51_ADNI1_3T_DICT_11_01_13.csv</i>.</p>
        </li>
        <br />
        <li>
          <b>Patients</b> <br />
          Two types of input files is needed for uploading patients info: <br />
          <i>Demographic file</i> and <i>Visits file</i>. <br />
          Examples: <br />
          <p style="margin-left: 40px">
            <i>PTDEMOG.csv</i> as Demographic file. <br />
            <i>ADNI_Complete1YearVisitList_8_22_12.csv</i> as Visits file.
          </p>
        </li>
        <br />
        <li>
          <b>Images</b> <br />
          <i>Image Analysis file</i> type is needed for generating the images objects on the system.
          <br />
          Example: <br />
          <p style="margin-left: 40px"> <i>UCSFFSX51_ADNI1_3T_02_01_16.csv</i>.</p>
        </li>
        <br />
      </ul>
      In case there is any error, please ensure you have selected the correct file for each upload
      section.
    </div>
    <h3 class="doc-subtitle">2. Extract data</h3>
    <div class="doc-text">
      Select which phenotupes from which patients from the system database you want to get the info
      and click on <b>DOWNLOAD DATA</b> button. <br />
      You can filter patients and brain parts with heir respective search bar. <br />
      Wait a bit and... there you are! You hace your generated <i>csv</i> file with the selected
      data.
    </div>
  </v-container>
</template>

<style>
.doc-container {
  margin-top: 60px;
}

.doc-title {
  font-weight: 400;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 30px;
}

.doc-subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.doc-text {
  text-align: initial;
  font-size: 20px;
  padding-bottom: 30px;
  font-weight: 300;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
