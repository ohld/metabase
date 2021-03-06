/* eslint "react/prop-types": "warn" */
import React from "react";
import PropTypes from "prop-types";
import { isQueryable } from "metabase/lib/table";
import Icon from "metabase/components/Icon";

const SchemaPane = ({ schema: { database, schema }, show, ...props }) => {
  const tables = database.tables
    .filter(t => t.schema === schema)
    .filter(isQueryable)
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div>
      <div className="ml1 my2 flex align-center justify-between border-bottom pb1">
        <div className="flex align-center">
          <Icon name="folder" className="text-medium pr1" size={14} />
          <h3 className="text-wrap">{schema}</h3>
        </div>
        <div className="flex align-center">
          <Icon name="table2" className="text-light pr1" size={12} />
          <span className="text-medium">{tables.length}</span>
        </div>
      </div>

      <ul>
        {tables.map(table => (
          <li key={table.id}>
            <a
              className="flex-full flex p1 text-bold text-brand text-wrap no-decoration bg-medium-hover"
              onClick={() => show("table", table)}
            >
              {table.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

SchemaPane.propTypes = {
  show: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
};

export default SchemaPane;
