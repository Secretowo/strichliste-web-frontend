import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { DefaultThunkAction } from '../../store';
import {
  Article,
  CreateTransactionParams,
  getArticleByBarcode,
  startCreatingTransaction,
} from '../../store/reducers';
import { Scanner } from '../common/scanner';
import { Toast } from '../common/toast';
import { Currency } from '../currency';

interface State {
  message: string;
  article: Article | null;
}

interface OwnProps {
  userId: number;
}

interface ActionProps {
  // tslint:disable-next-line:no-any
  getArticleByBarcode(barcode: string): any;
  startCreatingTransaction(
    userId: number,
    params: CreateTransactionParams
  ): DefaultThunkAction;
}

type Props = ActionProps & OwnProps;

const initialState = { message: '', article: null };
export class ArticleScanner extends React.Component<Props, State> {
  public state = initialState;

  public resetState = () => {
    this.setState(initialState);
  };

  public handleChange = async (barcode: string) => {
    this.setState({ message: barcode });
    try {
      const article: Article = await this.props.getArticleByBarcode(barcode);
      this.setState({ message: 'ARTICLE_FETCHED_BY_BARCODE', article });
      this.createTransaction(article);
    } catch (error) {
      this.setState({ message: ':(' });
    }
  };

  public createTransaction = (article: Article): void => {
    this.props.startCreatingTransaction(this.props.userId, {
      amount: article.amount,
      articleId: article.id,
    });
  };

  public render(): JSX.Element | null {
    return (
      <>
        {this.state.message && (
          <Toast onFadeOut={this.resetState} fadeOutSeconds={6}>
            <ToastContent {...this.state} />
          </Toast>
        )}
        <Scanner onChange={this.handleChange} />
      </>
    );
  }
}

const mapDispatchToProps: ActionProps = {
  getArticleByBarcode,
  startCreatingTransaction,
};

export const ConnectedArticleScanner = connect(
  undefined,
  mapDispatchToProps
)(ArticleScanner);

function ToastContent({ article, message }: State): JSX.Element {
  if (article === null) {
    return <>{message}</>;
  }
  return (
    <>
      <FormattedMessage id="ARTICLE_FETCHED_BY_BARCODE" />
      <p>{article.name}</p>
      <Currency value={article.amount} />
    </>
  );
}