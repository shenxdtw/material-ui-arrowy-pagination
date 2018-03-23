import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const IconButtonStyle = {
  width: '36px',
  height: '36px',
};

const pageNumberStyle = {
  fontSize: '16px',
  cursor: 'pointer',
};

const calculateRange = arg => {
  const {total, current, display} = arg;
  let end = total;
  let start = 1;
  if (display < end) {
    let beforeNumber = Math.floor(display / 2);
    const afterNumber = beforeNumber;
    if (display % 2 === 0) {
      beforeNumber -= 1;
    }

    if (current <= beforeNumber + 1) {
      end = display;
    } else if (current >= (total - afterNumber)) {
      start = total - display + 1;
    } else {
      start = current - beforeNumber;
      end = current + afterNumber;
    }
  }

  return {end, start};
};

const getStateFromProps = props => {
  let {total, current, display} = props;
  total = total > 0 ? total : 1;
  current = current > 0 ? current : 1;
  display = display > 0 ? display : 1;
  current = current < total ? current : total;
  display = display < total ? display : total;
  return {current, display, total};
};

const Page = ({pageNumber, isActive, onClick, styleButton, stylePrimary}) => {
  if (styleButton) {
    return (
      <div
        style={(isActive)?stylePrimary:styleButton}
        onClick={onClick}
      >
        <label
          style={pageNumberStyle}
        >
          {pageNumber}
        </label>
      </div>
    );
  } else {
    return (
      <IconButton
        style={IconButtonStyle}
        onClick={onClick}
        aria-label={`page-${pageNumber}`}
        color={(isActive)?"primary":"default"}
      >
        <label
          style={pageNumberStyle}
        >
          {pageNumber}
        </label>
      </IconButton>
    );
  }
};
Page.propTypes = {
  value: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  styleButton: PropTypes.object,
  stylePrimary: PropTypes.object,
};

const FirstPageButton = ({onClick, styleFirstPageButton, disabled}) => {
  if (styleFirstPageButton) {
    return (
      <div
        style = {styleFirstPageButton}
        onClick = {onClick}
        disabled={disabled}
      />
    );
  } else {
    return (
      <IconButton
        style={IconButtonStyle}
        onClick={onClick}
        disabled={disabled}
        aria-label="FirstPage"
      >
        <Icon>first_page</Icon>
      </IconButton>
    );
  }
};

FirstPageButton.propTypes = {
  onClick: PropTypes.func,
  styleFirstPageButton: PropTypes.object,
  disabled: PropTypes.bool,
};

const PreviousPageButton = ({onClick, stylePreviousPageButton, disabled}) => {
  if (stylePreviousPageButton) {
    return (
      <div
        style={stylePreviousPageButton}
        onClick={onClick}
        disabled={disabled}
      />
    );
  } else {
    return (
      <IconButton
        style={IconButtonStyle}
        onClick={onClick}
        disabled={disabled}
        aria-label="FirstPage"
      >
        <Icon>navigate_before</Icon>
      </IconButton>
    );
  }
};

PreviousPageButton.propTypes = {
  onClick: PropTypes.func,
  styleFirstPageButton: PropTypes.object,
  disabled: PropTypes.bool,
};

const NextPageButton = ({onClick, styleNextPageButton, disabled}) => {
  if (styleNextPageButton) {
    return (
      <div
        style={styleNextPageButton}
        onClick={onClick}
        disabled={disabled}
      />
    );
  } else {
    return (
      <IconButton
        style={IconButtonStyle}
        onClick={onClick}
        disabled={disabled}
        aria-label="NextPage"
      >
        <Icon>navigate_next</Icon>
      </IconButton>
    );
  }
};

NextPageButton.propTypes = {
  onClick: PropTypes.func,
  styleFirstPageButton: PropTypes.object,
  disabled: PropTypes.bool,
};

const LastPageButton = ({onClick, styleLastPageButton, disabled}) => {
  if (styleLastPageButton) {
    return (
      <div
        style={styleLastPageButton}
        onClick={onClick}
        disabled={disabled}
      />
    );
  } else {
    return (
      <IconButton
        style={IconButtonStyle}
        onClick={onClick}
        disabled={disabled}
        aria-label="LastPage"
      >
        <Icon>last_page</Icon>
      </IconButton>
    );
  }
};

LastPageButton.propTypes = {
  onClick: PropTypes.func,
  styleLastPageButton: PropTypes.object,
  disabled: PropTypes.bool,
};

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    const tem = getStateFromProps(props);
    this.setCurrent = this.setCurrent.bind(this);
    this.handleClickPreviousPage = this.handleClickPreviousPage.bind(this);
    this.handleClickNextPage = this.handleClickNextPage.bind(this);

    this.state = {
      ...tem,
      ...calculateRange(tem),
    };
  }

  componentWillReceiveProps(nextProps) {
    const tem = getStateFromProps(nextProps);
    this.setState({
      ...tem,
      ...calculateRange(tem),
    });
  }

  setCurrent(current) {
    const tem = {...this.state, current};
    this.props.onChange(current, this.state.current);
    this.setState({
      ...tem,
      ...calculateRange(tem),
    });
  }

  handleClickPreviousPage() {
    if (this.state.current > 1)
      this.setCurrent(this.state.current - 1);
  }

  handleClickNextPage() {
    if (this.state.current < this.state.total)
      this.setCurrent(this.state.current + 1);
  }

  render() {
    const array = [];
    for (let i = this.state.start; i <= this.state.end; i += 1) {
      array.push(i);
    }

    return (
      <div 
        className={this.props.className}
        style={{...this.props.styleRoot, ...this.props.style}}
      >
        {
          (this.props.showFirstPageButton) &&
          <FirstPageButton
            onClick={() => this.setCurrent(1)}
            styleFirstPageButton={this.props.styleFirstPageButton}
            disabled={(this.state.current === 1)}
          />
        }
        {
          (this.props.showPreviousPageButton) &&
          <PreviousPageButton
            onClick={this.handleClickPreviousPage}
            stylePreviousPageButton={this.props.styleFirstPageButton}
            disabled={(this.state.current === 1)}
          />
        }
        {
          (this.props.showPageNumberButton) &&
          (array.map((page, k) => (
            <Page
              key={k}
              pageNumber={page}
              isActive={this.state.current===page}
              onClick={() => this.setCurrent(page)}
              styleButton={this.props.styleButton}
              stylePrimary={this.props.stylePrimary}
            />
          )))
        }
        {
          (this.props.showNextPageButton) &&
          <NextPageButton
            onClick={this.handleClickNextPage}
            styleNextPageButton={this.props.styleFirstPageButton}
            disabled={(this.state.current === this.state.total)}
          />
        }
        {
          (this.props.showLastPageButton) &&
          <LastPageButton
            onClick={() => this.setCurrent(this.state.total)}
            styleLastPageButton={this.props.styleLastPageButton}
            disabled={(this.state.current === this.state.total)}
          />
        }
      </div>
    );
  }
}

Pagination.propTypes = {

  // eslint-disable-next-line react/no-unused-prop-types
  total: PropTypes.number,

  // eslint-disable-next-line react/no-unused-prop-types
  current: PropTypes.number,

  // eslint-disable-next-line react/no-unused-prop-types
  display: PropTypes.number,
  onChange: PropTypes.func.isRequired,

  className: PropTypes.string,
  style: PropTypes.object,
  styleRoot: PropTypes.object,
  styleFirstPageButton: PropTypes.object,
  stylePreviousPageButton: PropTypes.object,
  styleNextPageButton: PropTypes.object,
  styleLastPageButton: PropTypes.object,
  styleButton: PropTypes.object,
  stylePrimary: PropTypes.object,
  showFirstPageButton: PropTypes.bool,
  showPreviousPageButton: PropTypes.bool,
  showPageNumberButton: PropTypes.bool,
  showNextPageButton: PropTypes.bool,
  showLastPageButton: PropTypes.bool,
};

Pagination.defaultProps = {
  styleRoot: null,
  styleFirstPageButton: null,
  stylePreviousPageButton: null,
  styleNextPageButton: null,
  styleLastPageButton: null,
  styleButton: null,
  stylePrimary: null,
  showFirstPageButton: false,
  showPreviousPageButton: false,
  showPageNumberButton: true,
  showNextPageButton: false,
  showLastPageButton: false,
};

Pagination.displayName = 'Pagination';
export default Pagination;