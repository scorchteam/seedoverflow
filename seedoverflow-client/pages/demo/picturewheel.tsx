import type { NextPage } from 'next'
import Container from '../../components/common-components/Container/Container'
import PictureWheel, { PictureWheelSlide } from '../../components/common-components/PictureWheel/PictureWheel'

const PictureWheelDemo: NextPage = () => {

    const pictureWheelSlides: PictureWheelSlide[] = [
        {
            imageLink: "https://via.placeholder.com/1920/1080",
            description: "Random Image 1"
        },
        {
            imageLink: "https://via.placeholder.com/1280/720",
            description: "Random Image 2"
        },
        {
            imageLink: "https://via.placeholder.com/720/480",
            description: "Random Image 3"
        },
    ]

    return (
        <Container className=''>
            <div className='w-full h-[250px] sm:h-[250px] md:h-[350px] lg-[450px] xl:h-[550px]'>
                <PictureWheel slides={pictureWheelSlides} />
            </div>
        </Container>
    )
}

export default PictureWheelDemo