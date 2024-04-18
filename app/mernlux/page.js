import LuxBrands from '@/components/LuxBrands'
import LuxCarousel from '@/components/LuxCarousel'
import LuxCatelog from '@/components/LuxCatelog'
import DolceGabbanaExclusive from '@/components/LuxExclusive'
import LuxFP from '@/components/LuxFP'
import LuxSlideC from '@/components/LuxSlideC'


export default function page() {

    return (
        <div>
            <LuxCarousel />
            <LuxBrands />
            <LuxSlideC />
            <LuxCatelog />
            <LuxFP />
            <DolceGabbanaExclusive />
        </div>
    )
}
