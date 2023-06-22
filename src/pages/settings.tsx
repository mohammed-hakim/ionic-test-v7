import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { ellipse, triangle } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Tab1 from './tab1';
import Tab2 from './tab2';

const Settings: React.FC = () => {

    return (
//  <IonPage>
//             <IonHeader>
//                 <IonToolbar>
//                 <IonButtons slot="start">
//                   <IonMenuButton></IonMenuButton>
//                 </IonButtons>
//                     <IonTitle>settings</IonTitle>
//                 </IonToolbar>
//             </IonHeader>
//             <IonContent className="ion-padding">
//                 UI here
//             </IonContent>
//         </IonPage>



        <IonTabs>
            <IonTabBar slot='bottom'>
                <IonTabButton tab='tab1' href='/app/settings/tab1'>
                    <IonIcon icon={triangle} />
                    <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab2' href='/app/settings/tab2'>
                    <IonIcon icon={ellipse} />
                    <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
                <Route path="/app/settings/tab1" component={Tab1}/>
                <Route path="/app/settings/tab2" component={Tab2}/>
                <Route exact path="/app/settings">
                    <Redirect to={'/app/settings/tab1'}></Redirect>
                </Route>
            </IonRouterOutlet>
        </IonTabs>
    );
};

export default Settings;