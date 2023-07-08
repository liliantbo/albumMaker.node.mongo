import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useSelector } from 'react-redux';
import { STATE_CANCELED, STATE_DELIVERED, STATE_DISPATCH, STATE_RETURNED, STATE_SENDED } from '../commonComponents/Properties';

const BarChart = () => {
  //redux store
  const albumList = useSelector(state => state.alb.albumList);

  // Obtener la fecha actual
  const today = new Date();

  // Obtener la fecha de hace 30 días
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Filtrar los álbumes por fecha dentro del rango de los últimos 30 días
  const filteredAlbums = albumList.filter((album) => {
    const albumDate = new Date(album.fecha);
    return albumDate >= thirtyDaysAgo && albumDate <= today;
  });

  const albumCountByState = filteredAlbums.reduce((count, album) => {
    const { estado } = album;
    if (count.hasOwnProperty(estado)) {
      count[estado]++;
    } else {
      count[estado] = 1;
    }
    return count;
  }, {});


  const data = {
    labels: [STATE_SENDED, STATE_DISPATCH, STATE_DELIVERED, STATE_RETURNED, STATE_CANCELED],
    datasets: [
      {
        label: 'Ordenes',
        data: [albumCountByState[STATE_SENDED],
        albumCountByState[STATE_DISPATCH],
        albumCountByState[STATE_DELIVERED],
        albumCountByState[STATE_RETURNED],
        albumCountByState[STATE_CANCELED]],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Ultimos 30 días</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
