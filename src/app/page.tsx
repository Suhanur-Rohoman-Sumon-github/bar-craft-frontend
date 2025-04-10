"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { saveAs } from "file-saver";
import Image from "next/image";
import axios from "axios";

type FormData = {
  licenseNumber: string;
  name: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  expiration: string;
  licenseClass: string;
  issueDate: string;
  issueCountry: string;
};

const BarcodeGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    licenseNumber: "",
    name: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    expiration: "",
    licenseClass: "",
    issueDate: "",
    issueCountry: "USA", // Default country set to USA
  });

  const [barcodeUrl, setBarcodeUrl] = useState<string>("");
  const [generated, setGenerated] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Generate Barcode URL based on form data
  const generateBarcodeUrl = (): string => {
    const {
      licenseNumber,
      name,
      dob,
      address,
      city,
      state,
      zip,
      expiration,
      licenseClass,
      issueDate,
      issueCountry,
    } = formData;

    const data = `
      ANSI 636003080002DL00410260ZM03010008
      DLDAQC-${licenseNumber}
      DCSC${name.split(" ")[0]} // First name (First part of Name)
      DDEN
      DACA${name.split(" ")[1]} // Last name (Second part of Name)
      DDFN
      DAD${name.split(" ")[2] || "UNKNOWN"} // Middle name (optional)
      DDGN
      DCAC
      DCBB
      DCDNONE
      DBD${dob}
      DBB${expiration}
      DBA${issueDate}
      DBC1
      DAU${address}
      DAYUNK
      DAG${city} ${state} ${zip}
      DAI${issueCountry}
      DAK${licenseClass}
      DCFA100E64A8
      DCGUSA
      DCK${licenseNumber}
      DDAF
      DDB${issueDate}
      DAW${expiration}
      ZMZMA01
    `;

    return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(
      data
    )}&code=PDF417`;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const barcode = generateBarcodeUrl();
    setBarcodeUrl(barcode);
    setGenerated(true);
  };

  // Download barcode as PNG
  // Download barcode as PNG
  // Import the saveAs function from file-saver

  // Import the saveAs function from file-saver

  // Ensure file-saver is installed and imported

  // Make sure the file-saver library is installed

 const handleDownload = async () => {
   try {
     // Ronnie Winfield's info
     const licenseNumber = "152-044-581-787";
     const name = "Ronnie Winfield"; 
     const dob = "1963-11-11"; // Date of birth
     const expiration = "2029-11-11"; // Expiration date
     const issueDate = "2024-01-24"; // Issue date
     const address = "24158 W Main St Ste 100";
     const city = "Plainfield";
     const state = "IL";
     const zip = "60544";
     const issueCountry = "USA";
     const licenseClass = "A"; // optional, based on your system

     const plan = {
       licenseNumber,
       name,
       dob,
       expiration,
       issueDate,
       address,
       city,
       state,
       zip,
       issueCountry,
       licenseClass,
     };

     const response = await axios.post(
       "https://pat-haven.vercel.app/api/v1/qr/generate-barcode",
       plan,
       {
         headers: {
           "Content-Type": "application/json",
         },
         responseType: "blob",
       }
     );

     const contentType = response.headers["content-type"];
     if (!contentType?.includes("image")) {
       console.error("Response is not an image:", response.data);
       throw new Error("Expected an image, but received something else");
     }

     saveAs(response.data, "ronnie_driver_license_barcode.png");
   } catch (error) {
     console.error("Failed to download image", error);
   }
 };


  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-xl space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-900">
        U.S. Drivers License Barcode Generator
      </h2>

      {/* Form to gather user's driver license data */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="dob"
            placeholder="Date of Birth (MMDDYYYY)"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="expiration"
            placeholder="Expiration Date (MMDDYYYY)"
            value={formData.expiration}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="licenseClass"
            placeholder="License Class"
            value={formData.licenseClass}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="issueDate"
            placeholder="Issue Date (MMDDYYYY)"
            value={formData.issueDate}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Barcode
        </button>
      </form>

      {/* Display Barcode */}
      {generated && (
        <div className="text-center mt-8">
          <div className="flex justify-center">
            <Image
              width={400}
              height={200}
              className="max-w-full max-h-full"
              alt="U.S. Driver's License Barcode"
              src={barcodeUrl}
            />
          </div>
          {/* Download Button */}
          <div className="mt-6">
            <button
              onClick={handleDownload}
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download Barcode as PNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeGenerator;
