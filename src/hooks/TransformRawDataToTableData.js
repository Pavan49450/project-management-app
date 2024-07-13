import formatDate from "./formatDate";

const TransformRawDataToTableData = (data) => {
  // Helper function to format the title
  const formatTitle = (title) => {
    return title
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Handle cases where two capital letters are together
  };

  // Extract and format titles from the keys of the first object
  const titles = Object.keys(data[0]).map((title) => formatTitle(title));

  // Helper function to format dates

  // Extract and format rows
  const rows = data.map((applicant) => {
    return Object.entries(applicant).map(([key, value]) => {
      // if (key.toLowerCase().includes("date")) {
      //   return formatDate(value).date;
      // }

      return value;
    });
  });

  return { titles, rows };
};

export default TransformRawDataToTableData;
