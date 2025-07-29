import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Importe os módulos do caminho correto
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Dashboard({ companys }) {
    return (
        <AuthenticatedLayout>
            <Head title="Início" />

            <div className="py-8">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                    <h1>Stores:</h1>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-2 text-gray-900">
                            {companys && companys.length > 0 ? (
                                <div>
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={3}
                                        loop={true}
                                        autoplay={{ delay: 3000 }}
                                        // navigation={true}
                                        pagination={{dynamicBullets: true}}
                                        modules={[Navigation, Pagination, Autoplay]}
                                        style={{paddingBottom: '25px', paddingTop: '5px'}}
                                    >
                                        {companys.map((company) => (
                                            <SwiperSlide 
                                                onClick={() => console.log(company.name)}
                                                key={company.id}
                                            >
                                                <div className="bg-white p-2 shadow-md rounded-lg flex items-start">
                                                    {company.logo ?
                                                        (<img 
                                                            src={company.logo} 
                                                            alt={`${company.name}'s profile`} 
                                                            style={{minWidth: '130px', maxWidth: '130px' }}
                                                            className="aspect-[2/3] object-cover object-[right] rounded-md mr-4" 
                                                        />)
                                                        : 
                                                        (
                                                            <div 
                                                                className="rounded-md mr-4" 
                                                                style={{
                                                                    background: '#efefef', 
                                                                    aspectRatio: '2/3', 
                                                                    minWidth: '130px',
                                                                    maxWidth: '130px', 
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <img width="90" height="90" src={"https://img.icons8.com/ios/90/online-store.png"} alt="online-store"/>
                                                            </div>
                                                        )
                                                    }
                                                    <div>
                                                        <h3 className="font-bold text-lg">{company.name}</h3>
                                                        <p><strong>Location:</strong> {company.address} - {company.zip_code}</p>
                                                        <p><strong>Email:</strong> {company.email}</p>
                                                        <p><strong>Phone:</strong> {company.phone}</p>
                                                        <p style={styles.observation}><strong>Description:</strong> {company.description}</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            ) : (
                                <p>No company found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const styles = {
    observation: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};