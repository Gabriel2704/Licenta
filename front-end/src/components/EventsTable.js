import React from 'react';
import '../css/eventstable.css';
import MaterialTable from 'material-table'
import { singleEventsRoute } from '../axios/routes';
import { postEvent, deleteEvent, updateEvent } from '../axios/controllers';

const TabelEvenimente = ({ evenimente }) => {
  const columns = [
    { title: "Name", field: "name" },
    { title: "Company", field: "company" },
  ];

  return (
    <div className="eventsTable">
      <MaterialTable
        title="Events"
        data={evenimente}

        columns={columns}

        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            try {
              postEvent(singleEventsRoute, newRow);
            } catch (error) {
              console.log(error);
            }
            
            setTimeout(() => {
              window.location.reload(false);
            }, 2000)
          }),

          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            try {
              deleteEvent(singleEventsRoute, selectedRow.id);
            } catch (err) {
              console.log(err);
            }

            setTimeout(() => {
              window.location.reload(false);
            }, 2000)
          }),

          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {    
            try {
              updateEvent(singleEventsRoute, { name: updatedRow.name, company: updatedRow.company }, oldRow.name);
            }
            catch (err) {
              console.log(err);
            }
            
            setTimeout(() => {
              window.location.reload(false);
            }, 2000)
          })
        }}

        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          exportButton: true
        }}

        localization={{
          toolbar: {
            exportCSVName: "Export as Excel",
            exportPDFName: "Export as PDF"
          }
        }}
      />
    </div>
  );

}

export default TabelEvenimente