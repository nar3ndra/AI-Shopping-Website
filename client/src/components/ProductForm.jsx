import React, { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import Axios from "../Axios";
import MultiSelectBox from "./MultiSelectBox";

const ProductForm = ({
  data,
  handleInputChange,
  link,
  changeLink,
  fields,
  changeFields,
  name,
  handleSubmit,
  handleCancel,
  changeCategory,
}) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("size", "auto");
      formData.append("image_file", file);
      try {
        const response = await axios({
          method: "post",
          url: "https://api.remove.bg/v1.0/removebg",
          data: formData,
          responseType: "arraybuffer",
          headers: {
            "X-Api-Key": `${import.meta.env.VITE_REACT_APP_REMOVEBG_KEY}`,
          },
        });

        if (response.status !== 200) {
          toast.error("Error removing background");
          return;
        }
        console.log(response);
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "image/png" });

        // Create a new FormData for the Cloudinary API
        formData = new FormData();
        formData.append("file", blob, "photo.png");
        formData.append("upload_preset", "shoekart");

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/deohymauz/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        changeLink(cloudinaryResponse.data.secure_url);
        toast.success(cloudinaryResponse.data.secure_url);
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  };

  const handleChange = (index, size, event) => {
    const newFields = [...fields];
    if (!newFields[index]) {
      newFields[index] = { size: size, quantity: 0 };
    }
    newFields[index].quantity = event.target.value;
    changeFields(newFields);
  };
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await Axios.get("product/options");
        console.log(res.data);
        setOptions({ ...res.data });
        // setOptions(res.data.brandOptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOptions();
  }, []);

  const colors = [
    "Red",
    "Green",
    "Blue",
    "Cyan",
    "Magenta",
    "Yellow",
    "Black",
    "White",
    "Gray",
    "Lime",
    "Maroon",
    "Navy",
    "Olive",
    "Purple",
    "Silver",
  ];
  return (
    <form className="order-table">
      <div className="dash-input-1">
        <div style={{ width: "100%" }}>
          <div className="form-group">
            <label htmlFor="name">Book Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Book Title"
              value={data.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc">Book Description</label>
            <textarea
              rows={4}
              placeholder="Enter Book description"
              id="desc"
              className="form-control"
              value={data.desc}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sku">BOOK ISBN Number</label>
            <input
              type="text"
              className="form-control"
              id="sku"
              value={data.sku}
              onChange={handleInputChange}
              placeholder="Enter Book ISBN number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={data.price}
              onChange={handleInputChange}
              min={0}
              placeholder="Enter Book price"
            />
          </div>
        </div>
        <div className="admin-upload">
          <label htmlFor="dropzone-file">
            <div>
              {link ? (
                <img src={link} alt="Preview" />
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p>Click to upload or drag and drop</p>
                </>
              )}
            </div>

            <input
              id="dropzone-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div className="dash-input-2">
        <div className="form-group">
          <label htmlFor="color">Book Binding Cover Color</label>
          <select
            className="form-control"
            id="color"
            onChange={handleInputChange}
            value={data.color}
          >
            <option value="">Select a color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">Book Category</label>
          <select
            className="form-control"
            id="brand"
            onChange={handleInputChange}
            value={data.brand}
          >
            <option value="">Select a Category</option>
            {options.brandOptions &&
              options.brandOptions.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="material">Binding Type</label>
          <input
            type="text"
            className="form-control"
            id="material"
            value={data.material}
            onChange={handleInputChange}
            placeholder="Enter Book type Hardcover/paperback"
          />
        </div>
        <div className="form-group">
          <label htmlFor="featured">Book published</label>
          <select
            className="form-control"
            id="featured"
            onChange={handleInputChange}
            value={data.featured}
          >
            <option value="false">false</option>{" "}
            <option value="true">true</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="category">Product Category</label>
        <MultiSelectBox
          customWidth={true}
          multiple={true}
          options={
            options.categoryOptions
              ? options.categoryOptions.map((category) => ({
                  value: category,
                  label: category,
                }))
              : []
          }
          value={data.category === "" ? [] : data.category.split(",")}
          onChange={(e) => {
            changeCategory(e.join(","));
          }}
        />
        {/* <select
          className="form-control"
          id="featured"
          onChange={handleInputChange}
          value={data.featured}
        >   
          <option value="false">false</option>{" "}
          <option value="true">true</option>
        </select> */}
      </div>
      <div className="orderContainer" style={{ flexDirection: "column" }}>
        <table className="order-table">
          <thead>
            <tr>
              {/* <th className="order-subheader order-th">Size</th>
              {Array.from({ length: 12 }, (_, i) => i + 3).map(
                (size, index) => (
                  <th className="order-subheader order-th" key={index}>
                    {size}
                  </th>
                )
              )} */}
            </tr>
          </thead>
          <tbody className="order-table-tbody">
            <tr>
              <td className="order-td">Number of books printed</td>
              {Array.from({ length: 12 }, (_, i) => i + 3).map(
                (size, index) => (
                  <td
                    key={index}
                    className="order-td"
                    style={{ padding: "0rem" }}
                  >
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        padding: "1rem 0",
                        border: "none",
                        outline: "none",
                      }}
                      min={0}
                      className="form-control"
                      id={`qty${index}`}
                      name="quantity"
                      value={fields[index]?.quantity || 0}
                      placeholder="Enter product quantity for size"
                      onChange={(event) => handleChange(index, size, event)}
                    />
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dash-input-4">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          {name}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
