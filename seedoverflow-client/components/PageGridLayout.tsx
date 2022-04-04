interface props {
    left: any,
    center: any,
    right: any
}

const PageGridLayout = (props: props) => {
    const {left, center, right} = props;

    return (
        <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] md:grid-cols-[200px_1fr] md:grid-rows-[1fr] lg:grid-cols-[200px_1fr_200px] xl:grid-cols-[250px_1fr_250px] w-full h-full">
            <section className="">{left}</section>
            <section>{center}</section>
            <section className="hidden lg:block">{right}</section>
        </div>
    )
}

export default PageGridLayout