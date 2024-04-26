import LuxProductOverview from '@/components/LuxProductOverview'
import { getProductById } from '@/lib/action';



export default async function page({ params }) {
    const { luxoverviewid } = params;
    const product = await getProductById(luxoverviewid);
    return (
        <div >
            <LuxProductOverview luxproduct={product} />
        </div>
    )
}
