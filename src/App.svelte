<style>
  .order-details {
    font-size: 24px;
    width: 100%;
  }

  .row {
    display: flex;
    background-color: #394245;
    border-radius: 10px;
    margin-bottom: 24px;
    color: #e2e2e2;
    padding: 1.2rem 2.4rem 1.2rem 2.4rem;
    align-items: center;
  }

  .label {
    width: 40%;
    min-width: 160px;
    font-size: 20px;
  }

</style>
<script>
  import { onMount } from "svelte";
  import numeral from "numeral";
  import axios from "axios";
  import { Swipe, SwipeItem } from "svelte-swipe";

  const swipeConfig = {
    autoplay: false,
    delay: 0,
    showIndicators: false,
    transitionDuration: 1000,
    defaultIndex: 0,
  };

  // load a locale
  numeral.register("locale", "ru", {
    delimiters: {
      thousands: " ",
      decimal: ",",
    },
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t",
    },
    ordinal: function (number) {
      return ".";
    },
    currency: {
      symbol: "₽",
    },
  });
  numeral.locale("ru");

  // TODO: АКЦИЯ: фиксированная ставка (100р за обмен) или 1%
  let btcPrice = localStorage.getItem("lastPrice", "848.892");
  let values = {
    price: 0,
    amount: 0,
  };
  let address = '';
  let loading = false;
  axios
    .get("http://localhost:8080/price", {
      params: { currency: "btc", value: 1 },
    })
    .then((resp) => {
      btcPrice = numeral(resp.data).format();
      localStorage.setItem("lastPrice", btcPrice);
    });

  const getCurrencyPrice = ({ currency, value }) =>
    axios
      .get("http://localhost:8080/price", {
        params: { currency, value },
      })
      .then((resp) => resp.data);

  onMount(() => {
    const elPrice = document.getElementById("price");
    const elAmount = document.getElementById("amount");

    const initNumericInput = (el, format) => {
      el.addEventListener("blur", (e) => {
        if (el.value === "") {
          el.value = 0;
        }
        const value = numeral(values[el.id]).value();
        let currency = e.target.id === "price" ? "rub" : "btc";
        if (loading) {
          return;
        }
        if (value === 0) {
          el.value = 0;
          return;
        }
        loading = true;
        getCurrencyPrice({ currency, value })
          .then((data) => {
            let inputToUpdate = e.target.id === "price" ? "amount" : "price";
            values[inputToUpdate] = numeral(data).format("0,0[.]00000000");
            loading = false;
          })
          .catch((e) => console.error(e));
        if (currency === "price") {
          values[el.id] = numeral(value).format();
        } else {
          values[el.id] = numeral(value).format("0,0[.]00000000");
        }
      });
    };

    initNumericInput(elPrice);
    elPrice.addEventListener("focus", (e) => {
      if (e.target.value === "0") {
        e.target.value = "";
      }
    });
    initNumericInput(elAmount, "0,0[.]00000000");
  });
</script>

<div id="__next">
  <div class="styled__PageWrapper-nz051x-0 bXuSMf">
    <div class="page-index styled__RouteWrapper-nz051x-1 drsJoZ">
      <div
        id="ui-content-wrapper"
        class="styled__ContentWrapper-nz051x-3 kTeoBv">
        <div class="styled__Wrapper-jh5f4m-0 hgLKRt">
          <h1 style="margin-top: 100px;">Купить BTC за QIWI</h1>
          <h3>Самый выгодный курс. </h3>
          <section class="styled__Section-sc-41jxkj-0 bvFigX">
            <div class="styled__Wrapper-sc-41jxkj-1 kiWDxD">
              <div class="styled__Calculator-sc-41jxkj-4 gmVwgp">
                <div
                  class="exchange-block styled__ExchangeBlock-th509d-0 fMoEvE">
                  <div
                    class="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa">
                    <span
                      class="currency-block__label
                        styled__CurrencyLabel-g3y0ua-1 biCxOe">Вы тратите</span>
                    <input
                      id="price"
                      class="c-price-value currency-block__value
                        styled__CurrencyValue-g3y0ua-2 cLCbhf"
                      maxlength="6"
                      bind:value={values.price} />
                    <div
                      class="currency-block__currency
                        styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                      <button
                        class="currency-block__switch switchable
                          styled__CurrencySwitch-g3y0ua-4 hSxRPn"
                        type="button"
                        id="currency_button_from">
                        <div class="full-name-label">QIWI</div>RUB
                      </button>
                    </div>
                    <div class="styled__DropListWrapper-tlgv5r-0 bZzVdI">
                      <div
                        id="currency_droplist_from"
                        class="cl-droplist searchable sc-kAzzGY ecaGhb">
                        <div class="sc-dxgOiQ lbrKRb">
                          <div class="sc-ckVGcZ gnBaSq">
                            <i
                              style="display:inline-block;vertical-align:middle"><svg
                                width="16"
                                height="16"
                                viewbox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7.22222 13.4444C10.6587 13.4444 13.4444 10.6587 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444Z"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path
                                  d="M15.0005 14.9995L11.6172 11.6162"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg></i><input
                              type="text"
                              value=""
                              placeholder="Type a currency or ticker" />
                          </div>
                          <button
                            type="button"
                            tabindex="-1"
                            class="sc-jKJlTe bMVsLX"><i
                              style="display:inline-block;vertical-align:middle"><svg
                                width="16"
                                height="16"
                                viewbox="0 0 16 16"
                                fill="#80A3B6"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M14 2L2 14"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path
                                  d="M2 2L14 14"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg></i></button>
                        </div>
                        <ul class="sc-bZQynM sc-chPdSV cDSbBZ" />
                        <div class="sc-kgoBCf fBZIYa">
                          <div
                            class="styled__DroplistHintContent-tlgv5r-1 jhUTNd">
                            <svg
                              width="16"
                              height="16"
                              viewbox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.6667 6.9668H3.33333C2.59695 6.9668 2 7.56375 2 8.30013V12.9668C2 13.7032 2.59695 14.3001 3.33333 14.3001H12.6667C13.403 14.3001 14 13.7032 14 12.9668V8.30013C14 7.56375 13.403 6.9668 12.6667 6.9668Z"
                                stroke="#10D078"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                              <path
                                d="M4.66675 6.9668V4.30013C4.66675 3.41608 5.01794 2.56823 5.64306 1.94311C6.26818 1.31799 7.11603 0.966797 8.00008 0.966797C8.88414 0.966797 9.73198 1.31799 10.3571 1.94311C10.9822 2.56823 11.3334 3.41608 11.3334 4.30013V6.9668"
                                stroke="#10D078"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                            </svg>&mdash; fixed rate available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="styled__AlertsBlock-th509d-4 cGhoPf">
                    <div class="switch-block">
                      <div class="left-side">
                        <svg
                          width="16"
                          height="16"
                          viewbox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.8013 7.59961H5.20051C4.75861 7.59961 4.40039 7.95783 4.40039 8.39973V11.2001C4.40039 11.642 4.75861 12.0002 5.20051 12.0002H10.8013C11.2432 12.0002 11.6014 11.642 11.6014 11.2001V8.39973C11.6014 7.95783 11.2432 7.59961 10.8013 7.59961Z"
                            fill="#80A3B6" />
                          <path
                            d="M6 7.59955V5.99931C6 5.4688 6.21074 4.96002 6.58587 4.5849C6.961 4.20977 7.46978 3.99902 8.00029 3.99902C8.5308 3.99902 9.03958 4.20977 9.41471 4.5849"
                            stroke="#80A3B6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>
                        <div class="rate-info">
                          <span>1 BTC ~ ... ETH</span>
                        </div>
                      </div><button
                        type="button"
                        tabindex="0"
                        class="exchange-switch-button"><svg
                          width="14"
                          height="12"
                          viewbox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0.888916 3.22266L3.11112 1.00045L5.33333 3.22266"
                            stroke="#80A3B6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M3.11108 10.7773L3.11108 0.999619"
                            stroke="#80A3B6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M13.1112 8.77779L10.889 11L8.66675 8.77779"
                            stroke="#80A3B6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M10.8889 1.22228L10.8889 11"
                            stroke="#80A3B6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg></button>
                    </div>
                  </div> -->
                  <div
                    class="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa">
                    <span
                      class="currency-block__label
                        styled__CurrencyLabel-g3y0ua-1 biCxOe">Вы получаете
                      примерно</span>
                    <input
                      id="amount"
                      maxlength="16"
                      class="currency-block__value
                        styled__CurrencyValue-g3y0ua-2 cLCbhf"
                      bind:value={values.amount} />
                    <div
                      class="currency-block__currency
                        styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                      <button
                        class="currency-block__switch switchable
                          styled__CurrencySwitch-g3y0ua-4 hSxRPn"
                        type="button"
                        id="currency_button_to">
                        <div class="full-name-label">Bitcoin</div>BTC
                      </button>
                    </div>
                    <div class="styled__DropListWrapper-tlgv5r-0 bZzVdI">
                      <div
                        id="currency_droplist_to"
                        class="cl-droplist searchable sc-kAzzGY ecaGhb">
                        <div class="sc-dxgOiQ lbrKRb">
                          <div class="sc-ckVGcZ gnBaSq">
                            <i
                              style="display:inline-block;vertical-align:middle"><svg
                                width="16"
                                height="16"
                                viewbox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7.22222 13.4444C10.6587 13.4444 13.4444 10.6587 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444Z"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path
                                  d="M15.0005 14.9995L11.6172 11.6162"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg></i><input
                              type="text"
                              value=""
                              placeholder="Type a currency or ticker" />
                          </div>
                          <button
                            type="button"
                            tabindex="-1"
                            class="sc-jKJlTe bMVsLX"><i
                              style="display:inline-block;vertical-align:middle"><svg
                                width="16"
                                height="16"
                                viewbox="0 0 16 16"
                                fill="#80A3B6"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M14 2L2 14"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path
                                  d="M2 2L14 14"
                                  stroke="#80A3B6"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg></i></button>
                        </div>
                        <ul class="sc-bZQynM sc-chPdSV cDSbBZ" />
                        <div class="sc-kgoBCf fBZIYa">
                          <div
                            class="styled__DroplistHintContent-tlgv5r-1 jhUTNd">
                            <svg
                              width="16"
                              height="16"
                              viewbox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.6667 6.9668H3.33333C2.59695 6.9668 2 7.56375 2 8.30013V12.9668C2 13.7032 2.59695 14.3001 3.33333 14.3001H12.6667C13.403 14.3001 14 13.7032 14 12.9668V8.30013C14 7.56375 13.403 6.9668 12.6667 6.9668Z"
                                stroke="#10D078"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                              <path
                                d="M4.66675 6.9668V4.30013C4.66675 3.41608 5.01794 2.56823 5.64306 1.94311C6.26818 1.31799 7.11603 0.966797 8.00008 0.966797C8.88414 0.966797 9.73198 1.31799 10.3571 1.94311C10.9822 2.56823 11.3334 3.41608 11.3334 4.30013V6.9668"
                                stroke="#10D078"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                            </svg>&mdash; fixed rate available
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div
                    style="margin-top: 24px"
                    class="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa">
                    <span
                      class="currency-block__label
                        styled__CurrencyLabel-g3y0ua-1 biCxOe">Номер bitcoin кошелька</span>
                    <input
                      style="width: 100%; font-size: 18px;"
                      id="wallet"
                      maxlength="34"
                      placeholder="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                      class="currency-block__value
                        styled__CurrencyValue-g3y0ua-2 cLCbhf"
                      bind:value={address} />
                  </div>
                  <button
                    class="size-large color-green full-width exchange-button
                      sc-EHOje hKUrIz"
                    type="button"
                    href="/processing"><span>Купить</span></button>
                </div>
              </div>
              <div class="styled__Hero-sc-41jxkj-2 esrRra">
                <div class="order-details">
                  <div class="row">
                    <div class="cell label">Вы покупаете</div>
                    <div class="cell">0.0125&nbsp;BTC</div>
                  </div>
                  <div class="row">
                    <div class="cell label">Курс обмена</div>
                    <div class="cell">852,902</div>
                  </div>
                  <div class="row">
                    <div class="cell label">Комиссия</div>
                    <div class="cell">100р</div>
                  </div>
                  <div class="row">
                    <div class="cell label">К оплате</div>
                    <div class="cell">3100р</div>
                  </div>
                  <div class="row">
                    <div class="cell label">Статус</div>
                    <div class="cell">Ожидание оплаты</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>
