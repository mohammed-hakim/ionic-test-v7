import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {Swiper , SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css'
import './intro.css'
import SVG1 from '../assets/intro/1.svg'
import SVG2 from '../assets/intro/2.svg'
import SVG3 from '../assets/intro/3.svg'



interface ContainerProps {
    onfinish:()=>void
}

const SwiperButtonNext = ({children}:any)=>{
    const swiper = useSwiper()
    return <IonButton onClick={()=> swiper.slideNext()}>{children} </IonButton>
}
const Intro: React.FC<ContainerProps> = ({onfinish}) => {

    return (

        <Swiper>
            <SwiperSlide>
                <img src={SVG1} alt="into1" />
                <IonText>
                    <h3>build awesome apps using ionic!</h3>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={SVG2} alt="into2" />
                <IonText>
                    <h3>build awesome apps using ionic!</h3>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            
            <SwiperSlide>
                <img src={SVG3} alt="into3" />
                <IonText>
                    <h3>build awesome apps using ionic!</h3>
                </IonText>
                <IonButton onClick={()=>onfinish()}>Complete</IonButton>
            </SwiperSlide>

        </Swiper>
    );
};

export default Intro;