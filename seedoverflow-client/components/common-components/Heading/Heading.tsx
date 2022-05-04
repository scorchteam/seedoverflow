interface HeadingProps {
    type: 'h1' | 'h2' | 'h3',
    className?: string,
    children: any,
    center?: boolean
}

const Heading = (props: HeadingProps) => {

    const isCentered = () => {
        return props.center ? 'text-center' : ''
    }

    const renderHeading = () => {
        switch (props.type) {
            case 'h1':
                return <h1 className={`w-full text-3xl sm:text-4xl lg:text-6xl break-words ${isCentered()} ${props.className}`} style={{wordWrap: 'break-word', wordBreak: "break-word"}}>{props.children}</h1>
            case 'h2':
                return <h2 className={`text-2xl sm:text-3xl lg:text-4xl break-words ${isCentered()} ${props.className}`} style={{wordWrap: 'break-word', wordBreak: "break-word"}}>{props.children}</h2>
            case 'h3':
                return <h3 className={`text-xl sm:text-2xl lg:text-3xl break-words ${isCentered()} ${props.className}`} style={{wordWrap: 'break-word', wordBreak: "break-word"}}>{props.children}</h3>
            default:
                return <>Invalid Heading</>
        }
    }

    return (
        <>
            {renderHeading()}
        </>
    )
}

export default Heading