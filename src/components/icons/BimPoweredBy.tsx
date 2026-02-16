import BimPoweredByIcon from '@public/assets/images/logos/bimLogo_light.png'
import Image from 'next/image'

const BimPoweredBy = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Powered by</span>
            <Image src={BimPoweredByIcon} alt="BIM Logo" width={100} height={100} />
        </div>
    )
}

export default BimPoweredBy
