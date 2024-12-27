export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Lingkaran Latar Belakang */}
            <circle
                cx="50"
                cy="50"
                r="48"
                fill="#4CAF50"
                stroke="#2E7D32"
                strokeWidth="4"
            />

            {/* Salib Medis */}
            <rect x="40" y="20" width="20" height="60" rx="2" fill="#FFFFFF" />
            <rect x="20" y="40" width="60" height="20" rx="2" fill="#FFFFFF" />

            {/* Lingkaran Dalam untuk Estetika */}
            <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
            />
        </svg>
    );
}
