import React from 'react';

type GridProps = {
    rows: number;
    columns: number;
};

const Grid: React.FC<GridProps> = ({ rows, columns }) => {
    const cells = Array.from({ length: rows * columns });

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: '8px',
            }}
        >
            {cells.map((_, idx) => (
                <div
                    key={idx}
                    style={{
                        border: '1px solid #ccc',
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f9f9f9',
                    }}
                >
                    {idx + 1}
                </div>
            ))}
        </div>
    );
};

export default Grid;