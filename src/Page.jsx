import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Page = ({ itemCount, onChange }) => {
  const [current, setCurrent] = useState(1);
  const textItemRender = (current, type, element) => {
    if (type === "prev") {
      return "Prev";
    }
    if (type === "next") {
      return "Next";
    }
    return element;
  };

  const handleChange = (current) => {
    setCurrent(current);
    onChange(current * 20);
  };

  return (
    <Pagination
      total={itemCount}
      pageSize={20}
      itemRender={textItemRender}
      onChange={handleChange}
      current={current}
    />
  );
};

export default Page;
