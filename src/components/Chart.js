import React, { PureComponent } from 'react';
import { Cell, Pie, PieChart } from 'recharts';


const COLORS = ['#88D1A1', '#EAF6ED', '#4B8F64'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${ (percent * 100).toFixed(0) }%`}
        </text>
    );
};

export default class Chart extends PureComponent {

    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

    render() {

        const { tasks } = this.props;
        if (!tasks) return
        const doneTasks = tasks.filter(task => task.state === 'Done Tasks').length;
        const inProgressTasks = tasks.filter(task => task.state === 'In Progress Tasks').length;
        const remainingTasks = tasks.filter(task => task.state === 'Remaining Tasks').length;

        const data = [
            { name: 'Done Task', value: doneTasks },
            { name: 'In Progress Tasks', value: inProgressTasks },
            { name: 'Remaining Tasks', value: remainingTasks },
        ];

        return (
            <div>
                <PieChart width={400} height={200
                }>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#854d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${ index }`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <div style={{ marginTop: '1rem' }}>

                </div>
            </div>
        );
    }
}




