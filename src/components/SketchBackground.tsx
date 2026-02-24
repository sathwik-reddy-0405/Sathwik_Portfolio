import React from 'react';

const SketchBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] overflow-hidden">
            {/* Background cleared for cleaner aesthetic */}
        </div>
    );
};

export default SketchBackground;
