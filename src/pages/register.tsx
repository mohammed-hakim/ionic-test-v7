import {
    IonBackButton,
    IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {checkmarkDoneOutline, logInOutline, personCircleOutline} from 'ionicons/icons'
import React from "react";
import { Route } from "react-router-dom";
import IONIC from '../assets/favicon.png'
const Register: React.FC = () => {
  const doRegister = (e: any) => {
    e.preventDefault();
    console.log("register" , {e});
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
            </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={true} className="ion-padding">
        <div className="ion-text-center ion-padding">
          <img src={IONIC} alt="ionic logo" width={'50%'} />
        </div>
        <IonCard>
          <IonCardContent>
            <form className="ion-padding" onSubmit={doRegister}>
              <IonItem>
                <IonLabel position="floating">email</IonLabel>
                <IonInput type="email" placeholder="g@example.com" />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" />
              </IonItem>
              {/* <IonItem lines="none">
                <IonLabel>Remember me</IonLabel>
                <IonCheckbox defaultChecked={true} slot="start" />
              </IonItem> */}
              <IonButton
                className="ion-margin-top"
                type="submit"
                expand="block"
              >
               <IonIcon icon={logInOutline} slot="end"></IonIcon> Register
              </IonButton>
            <IonButton
                className="ion-margin-top"
                type="submit"
                expand="block"
                routerLink="/login"
                color={'secondary'}
              >
              <IonIcon icon={checkmarkDoneOutline} slot="end"></IonIcon>     Login
              </IonButton></form>
            
          </IonCardContent>
        </IonCard>
      </IonContent>

      <IonFooter>
        <IonToolbar>footer</IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
