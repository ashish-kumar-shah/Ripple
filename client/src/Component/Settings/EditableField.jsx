import React, { useState, useContext } from 'react';
import ServiceContext from '../../Context/CreateContext/ServicesContext';

const EditableField = ({ label, value, type = 'text', multiline = false, name,onSave }) => {
  const { updateFields } = useContext(ServiceContext);

  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(value);

  const handleSave = async () => {

    if (!name) {
      console.error('Field name is required!');
      return;
    }

    try {
      await updateFields({ [name]: input }); // ✅ Pass correct payload
        onSave(input)
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  const handleCancel = () => {
    setInput(value); // Reset to original value
    setEditMode(false);
  };

  return (
    <div className="w-full px-4 py-3 bg-white rounded-xl transition">
      <div className="flex items-start justify-between mb-2">
        <label className="text-gray-500 text-sm font-semibold">{label}</label>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="text-blue-600 text-sm hover:underline font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {editMode ? (
        <>
          {multiline ? (
            <textarea
              rows="3"
              className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <input
              type={type}
              className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
          <div className="flex gap-2 justify-end mt-3">
            <button
              onClick={handleCancel}
              className="text-sm px-4 py-1 rounded border text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-800 text-sm whitespace-pre-wrap">
          {type === 'password' ? '••••••••' : value}
        </p>
      )}
    </div>
  );
};

export default EditableField;
