import { useEffect, useState } from "react";
import WashPackage from "../../washPackage/WashPackage";
const BASE_URL = "http://localhost:8082";

export default function homeContent() {
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found");
          setError("No token found");
          return;
        }

        const responsePackage = await fetch(`${BASE_URL}/mypackage/readAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responsePackage.ok) {
          throw new Error(`HTTP error! status: ${responsePackage.status}`);
        }

        const resultPackage = await responsePackage.json();
        if (resultPackage.data && Array.isArray(resultPackage.data)) {
          setPackageData(resultPackage.data);
        } else {
          throw new Error("Data received is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError("Failed to fetch data from server.");
      }
    };

    fetchPackageData();
  }, []);
  return (
    <div className="px-2 py-3 mt-14 lg:ml-64 h-auto ">
      <div className="pt-1 grid overflow-x-auto">
        <div className="flex items-start h-full justify-center  ">
          <div className="p-4 grid 2 h-auto items-start">
            <div className="justify-center text-center py-2">
              <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap ">
                Package
              </span>
            </div>
            <div>
              <div className=" relative overflow-x-auto  md:rounded-lg flex flex-wrap justify-center">
                {packageData.map((item, index) => (
                  <WashPackage
                    key={index}
                    price={item.price}
                    kg={item.wash}
                    dry={item.dry}
                    url_img={`/src/assets/${item.name}.jpg`}
                    img_height="h-20"
                    size={item.name}
                    packageId={item.id}
                  />
                ))}
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
