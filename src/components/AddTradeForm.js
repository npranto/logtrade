import getUniqueId from "../utils/getUniqueId";
import render from "../utils/render";
import TICKERS from '../assets/data/tickers.json';

const componentId = getUniqueId();

const onLoad = (props = {}) => {
}

const styles = () => `
  .${componentId} .hide {
    display: none;
  }
  .${componentId} .ticker-input-block {
    position: relative;
  }
  .${componentId} .ticker-dropdown {
    margin-top: 1em;
    position: absolute;
    z-index: 5;
  }
  .${componentId} .opening-price-block,
  .${componentId} .closing-price-block,
  .${componentId} .stop-loss-block,
  .${componentId} .take-profit-block {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: baseline;
  }
  .${componentId} .opening-price-block > *,
  .${componentId} .closing-price-block > *,
  .${componentId} .stop-loss-block > *,
  .${componentId} .take-profit-block > * {
    width: 160px;
  }
`;

const AddTradeForm = (props = {}) => {
  return `
    <form class="add-trade-form AddTradeForm ${componentId}" id="add-trade-form">
      <div class="mb-3" id="ticker-select-block">
        <label for="tickerSelect" class="form-label">Ticker</label>
        <select class="form-select" id="tickerSelect" name="tickerSelect" aria-label="Select Ticker" required>
          <option selected>Select a ticker</option>
          ${TICKERS.map(ticker => `
            <option value="${ticker.organization}">
              <strong>${ticker.ticker}:</strong> 
              <i>${ticker.organization}</i>
            </option>
          `)}
        </select>
        <div class="custom-ticker-option text-center">
          <button type="button" class="btn btn-link" id="custom-ticker-btn">Custom Ticker?</button>
        </div>
      </div>

      <div class="mb-1 hide ticker-input-block" id="ticker-input-block">
        <label for="ticker" class="form-label">Ticker</label>
        <input type="text" class="form-control" id="ticker" name="ticker" aria-describedby="tickerHelp" placeholder="AAPL" required />
        <div id="tickerHelp" class="form-text">
          i.e., "AAPL" or "TSLA" 
          <button type="button" class="btn btn-link" id="select-default-ticker-btn">Select from default ticker list?</button>
        </div>
      </div>
      <div class="mb-3 hide" id="organization-input-block">
        <label for="organization" class="form-label">Organization</label>
        <input type="text" class="form-control" id="organization" name="organization" aria-describedby="organizationHelp" placeholder="Apple Inc." required />
        <div id="organizationHelp" class="form-text">i.e., "Apple Inc."</div>
      </div>

      <div class="mb-3">
        <label for="numberOfShares" class="form-label">Number of Shares</label>
        <input type="range" class="form-range" value="1" name="numberOfShares" step="1" min="1" max="10" id="numberOfShares" required />
        <div class="range-label text-center">
          <span class="label" id="range-value">1</span>
        </div>
      </div>

      <div class="mb-1 opening-price-block">
        <label for="openingPrice" class="form-label">Opening Price</label>
        <div class="input-group mb-1">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="number" class="form-control" name="openingPrice" id="openingPrice" placeholder="10.50" aria-label="Opening Price" aria-describedby="opening-price" required />
        </div>
      </div>

      <div class="mb-1 closing-price-block">
        <label for="closingPrice" class="form-label">Closing Price</label>
        <div class="input-group mb-1">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="number" name="closingPrice" class="form-control" id="closingPrice" placeholder="10.50" aria-label="Closing Price" aria-describedby="closing-price" required />
        </div>
      </div>

      <div class="mb-1 stop-loss-block">
        <label for="stopLoss" class="form-label">Stop Loss</label>
        <div class="input-group mb-1">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="number" name="stopLoss" class="form-control" id="stopLoss" placeholder="10.50" aria-label="Stop Loss" aria-describedby="stop-loss" required />
        </div>
      </div>

      <div class="mb-3 take-profit-block">
        <label for="takeProfit" class="form-label">Take Profit</label>
        <div class="input-group mb-1">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input type="number" name="takeProfit" class="form-control" id="takeProfit" placeholder="10.50" aria-label="Take Profit" aria-describedby="take-profit" required />
        </div>
      </div>

      <div class="mb-1">
        <label for="notes" class="form-label">Notes</label>
        <textarea class="form-control" placeholder="Any comments..." name="notes" id="notes" rows="3"></textarea>
      </div>
    </form>
  `
};

export default (props) => render(
  props, 
  componentId, 
  AddTradeForm, 
  styles, 
  onLoad,
  null,
);