import {
    IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import {logInOutline, personCircleOutline} from 'ionicons/icons'
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import IONIC from '../assets/favicon.png'
import Intro from "../components/intro";

import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen'

const Login: React.FC = () => {
  const router = useIonRouter()
  const [introSeen , setIntroSeen] = useState(true)
const [present,dismiss] = useIonLoading()
  useEffect(()=>{
    const checkStorage = async () =>{
      const seen = await Preferences.get({key : INTRO_KEY})
      setIntroSeen(seen.value == 'true')
    }
    checkStorage()
  })


  const doLogin = async(e: any) => {
    e.preventDefault();
    console.log("login" , {e});
    await present("Loggin in...")
    setTimeout(()=>{
      dismiss()
      router.push('/app' , 'root')
    } , 2000)
    
  };

  const finishIntro = async() =>{
    setIntroSeen(true)
    await Preferences.set({
      key: INTRO_KEY,
      value: 'true',
    });
  }
   const seeIntroAgain = async() =>{
    setIntroSeen(false)
    await Preferences.remove({
      key: INTRO_KEY,
    });
  }
  
  return (
    <>
{!introSeen? (<Intro onfinish={finishIntro}/>) :
<IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={true} className="ion-padding">
       <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <div className="ion-text-center ion-padding">
                        <img src={IONIC} alt="ionic logo" width={'50%'} />
              </div>
          </IonCol>
        </IonRow>

        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
               <IonCard>
          <IonCardContent>
            <form className="ion-padding" onSubmit={doLogin}>
              <IonItem>
                <IonLabel position="floating">email</IonLabel>
                <IonInput type="email" placeholder="g@example.com" />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" />
              </IonItem>
            
              <IonButton
                className="ion-margin-top"
                type="submit"
                expand="block"
              >
               <IonIcon icon={logInOutline} slot="end"></IonIcon> Login
              </IonButton>
            <IonButton
                className="ion-margin-top"
                type="submit"
                expand="block"
                routerLink="/register"
                color={'secondary'}
              >
              <IonIcon icon={personCircleOutline} slot="end"></IonIcon>     Create Account
              </IonButton></form>
            
          </IonCardContent>
        </IonCard>
          </IonCol>
        </IonRow>
       </IonGrid>
       
       
       
      </IonContent>

      <IonFooter>
        <IonToolbar><IonButton size="small"  onClick={()=>{seeIntroAgain()}}>see intro again</IonButton></IonToolbar>
      </IonFooter>
    </IonPage>}
  

    
   
    </>
    
  );
};

export default Login;
  {/* <IonItem lines="none">
                <IonLabel>Remember me</IonLabel>
                <IonCheckbox defaultChecked={true} slot="start" />
              </IonItem> */}