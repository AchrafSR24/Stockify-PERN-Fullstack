import React, { useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import { color } from 'echarts';

const PieEcharts = () => {
  const [productsNumber,setProductsNumber]=useState(0);
  const [stockNumber,setStockNumber]=useState(0);
  const [categoriesNumber,setCategoriesNumber]=useState(0);
  const [warehousesNumber,setWarehousesNumber]=useState(0);


    const getProductsNumber = async()=> {
      try {
        const response=await fetch(`http://localhost:5000/products/getProductsNumber/${localStorage.getItem('id')}`);
        const jsonData = await response.json();
        setProductsNumber(jsonData);
        
        
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(()=>{
      getProductsNumber(); 
    },[])

    const getWarehousesNumber = async()=> {
      try {
        const response=await fetch(`http://localhost:5000/warehouses/getWarehousesNumber/${localStorage.getItem('id')}`);
        const jsonData = await response.json();
        setWarehousesNumber(jsonData);

        
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(()=>{
      getWarehousesNumber(); 
    },[])

    const getCategoriesNumber = async()=> {
      try {
        const response=await fetch(`http://localhost:5000/categories/getCategoriesNumber/${localStorage.getItem('id')}`);
        const jsonData = await response.json();
        setCategoriesNumber(jsonData);
        
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(()=>{
      getCategoriesNumber(); 
    },[])

    const getStockNumber = async()=> {
      try {
        const response=await fetch(`http://localhost:5000/stock/getStockNumber/${localStorage.getItem('id')}`);
        const jsonData = await response.json();
        setStockNumber(jsonData);
        
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(()=>{
      getStockNumber(); 
    },[])


    const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#333",
      textStyle: {
        color: "var(--text-color)",
        fontSize: 14,
        fontWeight: "bold",
      },
      formatter: function (params) {
        const borderColor = params.color;
        const circleHtml = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${borderColor};"></span>`;
        return `${circleHtml}<span style="color: ${borderColor};">${params.name}</span>: ${params.value}`;
      },
      extraCssText: "border: none;",
    },
    legend: {
        orient: "vertical",
        x: "left",
        y: "top",
        textStyle: {
          color: document.body.classList.contains('light-mode') ? '#000' : '#fff',
        },
        formatter: function (name) {
          let data = option.series[0].data;
          let total = 0;
          for (let i = 0; i < data.length; i++) {
            total += data[i].value;
            if (data[i].name === name) {
              return `${name} : ${data[i].value}`;
            }
          }
          return `${name} : 0`;
        },
      },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            padAngle: 5,
            radius: ["60%", "100%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "transparent",
              borderWidth: 6
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
                label: {
                  show: true,
                  fontSize: 16,
                  formatter: function (params) {
                    return [
                      // "{b|" + params.name + "}",
                      "{per|" + Math.round(params.percent) + "%}",
                      // "{val|" + params.value + "}",
                    ].join("\n");
                  },
                  rich: {
                    // b: {
                    //   fontSize: 16,
                    //   lineHeight: 20,
                    //   color: function (params) {
                    //     return params.color;
                    //   },
                    // },
                    per: {
                      fontSize: 54,
                      lineHeight: 40,
                      color: document.body.classList.contains('light-mode') ? '#000' : '#fff' ,
                      fontWeight: "300",
                      fontFamily: "Montserrat",
                    },
                    // val: {
                    //   fontSize: 14,document.body.classList.contains('light-mode') ? '#cecece' : '#3c3c3c'
                    //   lineHeight: 20,
                    //   color: "var(--soft-color)",
                    // },
                  },
                },
              },
              labelLine: {
                show: false,
              },
            data: [
              { value: +productsNumber?.product_number, name: 'Produits' },
              { value: +warehousesNumber?.warehouse_number, name: 'Entrepôts' },
              { value: +categoriesNumber?.category_number, name: 'Categories' },
              { value: +stockNumber?.stock_number, name: 'Stock' }
            ]
          }
        ]
      };
  return (
    <div className='pieChart'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia molestias quisquam doloremque accusantium expedita in quibusdam cum? Dignissimos, in molestiae!</p>
      <ReactECharts option={option} />
    </div>
  )
}

export default PieEcharts

