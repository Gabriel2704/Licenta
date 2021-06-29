import React from 'react'
import { Bar } from 'react-chartjs-2';

const ChartParticipants = ({ evenimente, nrParticipanti }) => {
    let labels = [];

    let numbersParticipants = [];

    for (let i = 0; i < evenimente.length; i++) {
        labels[i] = evenimente[i].name;
    }

    for (let i = 0; i < nrParticipanti.length; i++) {
        numbersParticipants[i] = nrParticipanti[i];
    }

    return (
        <div className='chart'>
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: '# of participants',
                            data: numbersParticipants,
                            backgroundColor: [
                                'rgba(0, 255, 24, 0.6)',
                                'rgba(0, 0, 0, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(244, 244, 38, 0.6)',
                            ],
                            borderColor: [
                                'rgba(0, 255, 24, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(244, 244, 38, 1)',
                            ],
                            borderWidth: 1,
                            color: 'black',
                        },
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,

                    scales: {
                        yAxis: {
                            suggestedMax: 10,
                            ticks: {
                                color: 'black',
                                font: {
                                    size: 18
                                }
                            }
                        },

                        xAxis: {
                            grid: {
                                color: 'black'
                            },
                            ticks: {
                                color: 'black',
                                font: {
                                    size: 18
                                }
                            }

                        }
                    },

                    plugins: {
                        title: {
                            display: true,
                            text: 'Participants',
                            color: 'black',
                            font: {
                                size: 25
                            }
                        },
                        legend: {
                            labels: {
                                color: 'black',
                                font: {
                                    size: 18
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}
export default ChartParticipants