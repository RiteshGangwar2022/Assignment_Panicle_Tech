import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../App.css";

const Home = () => {

  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const dashboardRef = useRef(null);
  const PieChartRef = useRef(null);
  const [searchquery, setsearchquery] = useState("");

  useEffect(() => {
    axios
      .get("https://panicletech.onrender.com/api/employee/allemployee")
      .then((response) => {
        const result = response.data.employees;
        setdata(result);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);


  useEffect(() => {

    {/*to calculate salary to show on dashboard */}
    if (data.length === 0) return;

    const totalEmp = data.length;

    const totalSalary = data.reduce(
      (acc, emp) => acc + parseInt(emp.salary, 10),
      0
    );
    const avgSalary = totalSalary / totalEmp;
    createDashboardChart(totalEmp, avgSalary);
    createPieChart(data);
  }, [data]);


  {
    /*to create dashboard */
  }
  const createDashboardChart = (totalEmp, avgSalary) => {
    if (dashboardRef.current) {
      dashboardRef.current.destroy();
    }


    const ctx = document.getElementById("dashboard");
    dashboardRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Employees", "Average Salary"],
        datasets: [
          {
            label: "Key Metrics",
            data: [totalEmp, avgSalary.toFixed(2)],
            backgroundColor: [" #0dcaf0", " #0dcaf0"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };


  {
    /*To create pie chart  */
  }
  const createPieChart = (employees) => {
    if (PieChartRef.current) {
      PieChartRef.current.destroy();
    }

    const departments = {};
    employees.forEach((emp) => {
      if (departments[emp.department]) {
        departments[emp.department]++;
      } else {
        departments[emp.department] = 1;
      }
    });

    const departmentLabels = Object.keys(departments);
    const departmentData = Object.values(departments);

    const ctx = document.getElementById("PieChart");
    PieChartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: departmentLabels,
        datasets: [
          {
            label: "Distribution by Department",
            data: departmentData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              " #0dcaf0",
              "rgba(30, 160, 130, 0.6)",
            ],
          },
        ],
      },
    });
  };

  {
    /*to handle search query*/
  }
  const handleSearch = (event) => {
    setsearchquery(event.target.value.toLowerCase());

    if (searchquery === "") {
      setfilterdata([]);
    }
    const filtered = data.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(searchquery) ||
        emp.department.toLowerCase().includes(searchquery) ||
        emp.position.toLowerCase().includes(searchquery)
      );
    });
    setfilterdata(filtered);
  };

  
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col-md-6 gap-3 d-flex flex-column justify-content-end">
          <input
            type="text"
            placeholder="Search employees..."
            className="form-control search-input"
            onChange={handleSearch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="filtered-employees p-3 rounded shadow-sm">
                <h3>Filtered Employees</h3>
                <ul>
                  {filterdata.map((emp) => (
                    <li key={emp.id}>
                      {emp.name} - {emp.department} - {emp.position}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 p-5">
          <h3>Dashboard</h3>
          <canvas id="dashboard" width="60px" height="30px"></canvas>
        </div>
        <div className="col-md-6 p-5">
          <h3>Distribution by Department</h3>
          <canvas id="PieChart" width="20px" height="10px"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
