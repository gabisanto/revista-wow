import React from "react";
import Notes from "../../../src/components/Notes/Notes";
import axios from "axios";

const Note = ({ data, subcategoryData, subcategory }) => {
  return (
    <>
      <Notes
        content={data}
        subcategoryData={subcategoryData}
        subcategory={subcategory}
      />
    </>
  );
};

export default Note;

export async function getServerSideProps(context) {
  const {
    params: { note, subcategory },
  } = context;
  const id = note.split("-").pop();
  const [resNote, resSubcategory] = await Promise.all([
    axios.get(`${process.env.API_URL}/notes/${id}`),
    axios.get(
      `${process.env.API_URL}/notes?route_contains=${subcategory}&_limit=7`,
    ),
  ]);
  const data = await resNote.data;
  const subcategoryData = await resSubcategory.data.filter(
    (note) => note._id !== id,
  );

  return {
    props: {
      data,
      subcategoryData,
      subcategory,
    },
  };
}
