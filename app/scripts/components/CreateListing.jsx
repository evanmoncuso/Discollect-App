import React from 'react';
import NavBar from './NavBar.jsx';

const CreateListing = () => {
  let title;
  let location;
  let zip;
  let desc;
  let category;
  return (
    <div>
      <NavBar />
      <div className="main_container">
        <h1>Create a Listing</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!title.value.trim() && !location.value.trim() && !zip.value.trim()) {
              console.log('empty inputs');
              return;
            }

            const data = {
              title: title.value,
              location: location.value,
              zip: zip.value,
              desc: desc.value,
            };
            console.log(data);
          }}>

          <label>Title</label>
          <input ref={(node) => { title = node; }} />

          <label>Location</label>
          <input ref={(node) => { location = node; }} />

          <label>Zip Code</label>
          <input ref={(node) => { zip = node; }} />

          <label>Description</label>
          <textarea ref={(node) => { desc = node; }} />

          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
