import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import List from './list';
import Settings from './settings';

const Menu: React.FC = () => {
    const paths = [
        {name:'Home', url:'/app/list' , icon:homeOutline},
        {name:'Settings', url:'/app/settings' , icon:newspaperOutline}
    ]
    return (
        <>
        <IonPage>

            <IonSplitPane contentId='main-content'>
          <IonMenu contentId="main-content">
            <IonHeader>
              <IonToolbar color={'primary'}>
              
                <IonTitle>Menu Content</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {paths.map((item, i)=>(
                        <IonMenuToggle  key={i} autoHide={false}>
                            <IonItem detail={true} routerLink={item.url} routerDirection="none">
                              <IonIcon slot='start' icon={item.icon} ></IonIcon>  {item.name}
                            </IonItem>
                        </IonMenuToggle>
                ))}
                <IonMenuToggle autoHide={false}>
                            <IonButton expand='full' routerLink='/' routerDirection="root">
                              <IonIcon slot='start' icon={logOutOutline} ></IonIcon>  Logout
                            </IonButton>
                        </IonMenuToggle>
            </IonContent>
          </IonMenu>

          {/* <IonPage id="main-content">
            <IonHeader>
              <IonToolbar color={'primary'}>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
          </IonPage> */}

          <IonRouterOutlet id='main-content'>
            <Route   path='/app/settings' component={Settings} />
            <Route  exact path='/app/list' component={List} />
            <Route exact path="/app">
                <Redirect to='/app/list'/>
            </Route>
          </IonRouterOutlet>
          </IonSplitPane>
          </IonPage>
        </>
      );
    }
export default Menu;