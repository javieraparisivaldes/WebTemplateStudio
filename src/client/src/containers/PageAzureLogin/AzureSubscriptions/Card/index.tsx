import classnames from "classnames";
import * as React from "react";

import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";

import CardBody from "../../../../components/CardBody";

import buttonStyles from "../../../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../../../types/option";
import { Link } from "react-router-dom";
import { ROUTES, WIZARD_CONTENT_INTERNAL_NAMES } from "../../../../utils/constants";
import keyUpHandler from "../../../../utils/keyUpHandler";
import * as ModalActions from "../../../../actions/modalActions/modalActions";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../reducers";
import RootAction from "../../../../actions/ActionType";
import { connect } from "react-redux";

interface IProps {
  buttonText: string;
  option: IOption;
  disabled?: boolean;
  handleDetailsClick: (detailPageInfo: IOption) => void;
  isLoggedIn:boolean;
}

interface IDispatchProps {
  openCosmosDbModal: () => any;
  openAzureFunctionsModal: () => any;
  openAppServiceModal: () => any;
  openAzureLoginModal: (serviceInternalName: string) => any;
}

type Props = IProps & IDispatchProps & InjectedIntlProps;

export const Card = ({
  option,
  buttonText,
  disabled,
  handleDetailsClick,
  intl,
  isLoggedIn,
  openAzureLoginModal,
  openCosmosDbModal,
  openAzureFunctionsModal,
  openAppServiceModal

}: Props) => {
  const formattedBody = option.body as FormattedMessage.MessageDescriptor;
  const formattedTitle = option.title as FormattedMessage.MessageDescriptor;

  const getServicesModalOpener = (internalName: string) => {
    const modalOpeners = {
      [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: openCosmosDbModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: openAzureFunctionsModal,
      [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: openAppServiceModal
    };
    if (modalOpeners.hasOwnProperty(internalName)) {
      return modalOpeners[internalName];
    }
    return () => void(0);
  }

  const openModal = () =>{
    isLoggedIn ? getServicesModalOpener(option.internalName) : openAzureLoginModal(option.internalName)
  }
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardTitleContainer}>
        {option.svgUrl && (
          <img className={styles.icon} src={option.svgUrl} alt="" />
        )}
        <div className={styles.cardTitle}>
          {intl.formatMessage(formattedTitle)}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <CardBody
            formattedBody={formattedBody}
            expectedTime={
              option.expectedTime as FormattedMessage.MessageDescriptor
            }
            expectedPrice={
              option.expectedPrice as FormattedMessage.MessageDescriptor
            }
          />
        </div>
        <div className={styles.selectionContainer}>
          <Link
            onClick={() => handleDetailsClick(option)}
            className={styles.details}
            to={ROUTES.PAGE_DETAILS}
            tabIndex={disabled! ? -1 : 0}
            onKeyUp={keyUpHandler}
          >
            <FormattedMessage id="card.details" defaultMessage="Learn more" />
          </Link>
          <button
            disabled={disabled!}
            onClick={openModal}
            className={classnames(styles.signInButton, {
              [buttonStyles.buttonDark]: disabled,
              [buttonStyles.buttonHighlighted]: !disabled,
              [buttonStyles.buttonCursorDefault]: disabled,
              [buttonStyles.buttonCursorPointer]: !disabled
            })}
            tabIndex={disabled! ? -1 : 0}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  openCosmosDbModal: () => {
    dispatch(ModalActions.openCosmosDbModalAction());
  },
  openAzureFunctionsModal: () => {
    dispatch(ModalActions.openAzureFunctionsModalAction());
  },
  openAppServiceModal: () => {
    dispatch(ModalActions.openAppServiceModalAction());
  },
  openAzureLoginModal: (serviceInternalName: string) => {
    dispatch(ModalActions.openAzureLoginModalAction(serviceInternalName));
  }
});

export default connect(
  mapDispatchToProps
)(injectIntl(Card));
