import React from 'react';
import * as echarts from 'echarts';

const EfficiencyAllVarietyCharts = () => {
  // Sample data: Replace these values with your actual data
  const data = [
    { value: 30, name: '50% to 70%' },
    { value: 40, name: '71% to 100%' },
    { value: 25, name: '101% to 130%' }
  ];

  React.useEffect(() => {
    const chartDom = document.getElementById('pieChart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        // text: 'People Count by Efficiency',
        // subtext: 'Percentage Ranges',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      ],
      color: ['#EE6666', '#5470C6', '#91CC75', ],
    };

    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-4">Efficiency-based Count of People by Percentage</h2>
      <h2></h2>
      <div id="pieChart" style={{ width: '100%', height: '400px' }} />
      <div style={{ marginTop: '20px' }}>
        <p style={{ color: '#EE6666' }}>Total People Count in 50% to 70%: {data[0].value}</p>
        <p style={{ color: '#5470C6' }}>Total People Count in 71% to 100%: {data[1].value}</p>
        <p style={{ color: '#91CC75' }}>Total People Count in 101% to 130%: {data[2].value}</p>
      </div>
    </div>
  );
};

export default EfficiencyAllVarietyCharts;
