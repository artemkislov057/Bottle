const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});

const ctx = document.getElementById('myChart').getContext('2d');
const conf = { 
    text: "wfsdg",
    type: 'doughnut',
    data: {
        labels: [1, 2, 3, 4, 5],
        datasets: [{
            label: 'пробник',
            data: [2, 5, 2, 4, 2],
            backgroundColor:['#63CDDA','#2F3952']
           
      }]},
    options: {
          plugins: {
            legend: false,
        }
    }
}
const myChart = new Chart(ctx, conf);

setTimeout(x => {
    conf.data.datasets[0].data.push(10);
    console.log(conf.data.datasets[0].data);
    myChart.update();
}, 3000)


