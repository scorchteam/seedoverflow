/**
 * Renders the site-wide footer
 * @returns Rendered site-wide footer
 */
const Footer = () => {
    return (
        <div className="flex flex-col ">
            <svg id="svg" viewBox="0 0 1440 250" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
                <path d="M 0 250 C 0 250 0 50 0 50 C 64.4 54.75 128.8 59.5 193 54.5 C 257.2 49.5 321.2 34.8 378 36 C 434.8 37.2 484.4 54.3 542 61 C 599.6 67.7 665.3 63.95 735 57.5 C 804.7 51.05 878.5 41.9 929 40.5 C 979.5 39.1 1006.8 45.45 1065 48.5 C 1123.2 51.55 1212.3 51.3 1280 51 C 1347.7 50.7 1393.8 50.35 1440 50 C 1440 50 1440 250 1440 250 Z" className="transition-all duration-300 ease-in-out delay-150 path-0 fill-water-1 dark:fill-lava-1"></path>
                <path d="M 0 250 C 0 250 0 100 0 100 C 64.3 93.75 128.7 87.5 189 89.5 C 249.3 91.5 305.6 101.7 354 105.5 C 402.4 109.3 443 106.75 508 109 C 573 111.25 662.4 118.35 722 116.5 C 781.6 114.65 811.5 103.8 872 99 C 932.5 94.2 1023.7 95.45 1085 98.5 C 1146.3 101.55 1177.8 106.45 1232 107 C 1286.2 107.55 1363.1 103.8 1440 100 C 1440 100 1440 250 1440 250 Z" className="transition-all duration-300 ease-in-out delay-150 path-1 fill-water-2 dark:fill-lava-2"></path>
                <path d="M 0 250 C 0 250 0 150 0 150 C 44.4 162.15 88.9 174.25 146 167 C 203.1 159.75 272.9 133.05 346 133 C 419.1 132.95 495.4 159.55 563 163.5 C 630.6 167.45 689.5 148.8 750 138 C 810.5 127.2 872.7 124.3 924 133 C 975.3 141.7 1015.6 162.1 1073 161 C 1130.4 159.9 1205 137.4 1269 132 C 1333 126.6 1386.5 138.3 1440 150 C 1440 150 1440 250 1440 250 Z" className="transition-all duration-300 ease-in-out delay-150 path-2 fill-water-3 dark:fill-lava-3"></path>
                <path d="M 0 250 C 0 250 0 200 0 200 C 42.5 209.35 85 218.65 154 218.5 C 223 218.35 318.5 208.65 380 206.5 C 441.5 204.35 468.9 209.7 513 214.5 C 557.1 219.3 617.9 223.6 692 216 C 766.1 208.4 853.5 188.85 910 183 C 966.5 177.15 992 184.95 1053 191 C 1114 197.05 1210.6 201.3 1281 202.5 C 1351.4 203.7 1395.7 201.85 1440 200 C 1440 200 1440 250 1440 250 Z" className="transition-all duration-300 ease-in-out delay-150 path-3 fill-water-4 dark:fill-lava-4"></path></svg>
            <footer className="h-auto z-10 w-full text-light dark:text-dark flex items-center justify-around px-4 py-4 flex-col bg-water-4 dark:bg-lava-4">
                Copyright 2022 SeedOverflow
            </footer>
        </div>
    )
}

export default Footer
