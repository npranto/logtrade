/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
	filterTradesByMonthAndYear,
	getDateFromDate,
	getMonthFromDate,
	getNextMonthFromDate,
	getPrevMonthFromDate,
	getStatsFromTrades,
	getYearFromDate,
} from '../utils';
import {
	createNewTradeLog,
	deleteTradeLog,
	updateTradeLog,
} from '../vendors/firebase/firebase.firestore';
import AddNewTradeBtn from './AddNewTradeBtn';
import AddNewTradeFormModal from './AddNewTradeFormModal';
// import AddNewTradeSuccessAlert from "./AddNewTradeSuccessAlert";
import DailyTradesModal from './DailyTradesModal';
// import DeleteTradeSuccessAlert from "./DeleteTradeSuccessAlert";
import EditTradeFormModal from './EditTradeFormModal';
import MonthlyCalendarGrid from './MonthCalendarGrid';
import MonthlyStats from './MonthlyStats';
import MonthNavigator from './MonthNavigator';
import TradeLogDeleteConfirmModal from './TradeLogDeleteConfirmModal';
// import UpdateTradeSuccessAlert from "./UpdateTradeSuccessAlert";

class MonthlyCalendar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todayDate: new Date(),
			activeDate: new Date(),

			showDailyTradesModal: false,
			showAddNewTradeFormModal: false,
			// showAddNewTradeSuccessAlert: false,
			showEditTradeFormModal: false,
			// showUpdateTradeSuccessAlert: false,
			// showDeleteTradeSuccessAlert: false,
			showTradeLogDeleteConfirmModal: false,

			newTradeLogError: null,
			editTradeLogError: null,
			deleteTradeLogError: null,

			tradeToEdit: null,
			tradeToDelete: null,
			isLoading: false,
		};

		// this.fetchActiveMonthTradeLogs = this.fetchActiveMonthTradeLogs.bind(this);
		this.onClickOnPrevMonth = this.onClickOnPrevMonth.bind(this);
		this.onClickOnNextMonth = this.onClickOnNextMonth.bind(this);
		this.onSelectDay = this.onSelectDay.bind(this);
		this.setShowDailyTradesModal = this.setShowDailyTradesModal.bind(this);
		this.setShowAddNewTradeFormModal =
			this.setShowAddNewTradeFormModal.bind(this);
		this.onCreateNewTradeLog = this.onCreateNewTradeLog.bind(this);
		this.onCreateNewTradeLogAndAddMore =
			this.onCreateNewTradeLogAndAddMore.bind(this);
		this.onOpenAddNewTradeForm = this.onOpenAddNewTradeForm.bind(this);
		// this.setShowAddNewTradeSuccessAlert = this.setShowAddNewTradeSuccessAlert.bind(this);
		this.onUpdateNewTradeLog = this.onUpdateNewTradeLog.bind(this);
		this.setShowEditTradeFormModal = this.setShowEditTradeFormModal.bind(this);
		this.onDeleteTradeLog = this.onDeleteTradeLog.bind(this);
		this.onEditTradeLog = this.onEditTradeLog.bind(this);
		// this.setShowUpdateTradeSuccessAlert = this.setShowUpdateTradeSuccessAlert.bind(this);
		this.setShowTradeLogDeleteConfirmModal =
			this.setShowTradeLogDeleteConfirmModal.bind(this);
		this.onConfirmDeleteTrade = this.onConfirmDeleteTrade.bind(this);
		this.onNewTradeLogError = this.onNewTradeLogError.bind(this);
		// this.setShowDeleteTradeSuccessAlert = this.setShowDeleteTradeSuccessAlert.bind(this);
	}

	onClickOnPrevMonth() {
		const { activeDate } = this.state;
		console.log('click on prev month detected...');
		const firstOfPrevMonth = getPrevMonthFromDate(activeDate);
		this.setState({ activeDate: firstOfPrevMonth });
	}

	onClickOnNextMonth() {
		const { activeDate } = this.state;
		console.log('click on next month detected...');
		const firstOfNextMonth = getNextMonthFromDate(activeDate);
		this.setState({ activeDate: firstOfNextMonth });
	}

	// eslint-disable-next-line react/sort-comp
	setShowDailyTradesModal(status = false) {
		this.setState({ showDailyTradesModal: status });
	}

	setShowAddNewTradeFormModal(status = false) {
		this.setState({ showAddNewTradeFormModal: status });
	}

	// setShowAddNewTradeSuccessAlert(status = false) {
	//   this.setState({ showAddNewTradeSuccessAlert: status });
	// }

	setShowEditTradeFormModal(status = false) {
		this.setState({ showEditTradeFormModal: status });
	}

	onSelectDay({ month, date, year }) {
		this.setState({ activeDate: new Date(`${month} ${date}, ${year}`) });
		this.setShowDailyTradesModal(true);
	}

	setShowTradeLogDeleteConfirmModal(status = false) {
		this.setState({ showTradeLogDeleteConfirmModal: status });
	}

	// setShowDeleteTradeSuccessAlert(status = false) {
	//   this.setState({ showDeleteTradeSuccessAlert: status });
	// }

	async onCreateNewTradeLog(newTradeLog) {
		this.setState({ newTradeLogError: null });
		const { uid: userId } = this.props.user || {};
		const { error, isNewTradeCreated } = await createNewTradeLog(
			newTradeLog,
			userId
		);
		if (error) {
			this.setState({ newTradeLogError: error });
		} else {
			console.info(`New Trade created... ${isNewTradeCreated}`);
			this.setShowAddNewTradeFormModal(false);
			// this.setShowAddNewTradeSuccessAlert(true);
			this.props.refetchAllTrades();
		}
	}

	async onCreateNewTradeLogAndAddMore(newTradeLog) {
		const self = this;

		this.setState({ newTradeLogError: null });
		this.setState({ isLoading: true });

		setTimeout(async () => {
			self.setState({ isLoading: false });
			const { uid: userId } = self.props.user || {};
			const { error: createNewTradeLogError, isNewTradeCreated } =
				await createNewTradeLog(newTradeLog, userId);
			console.log({ newTradeLog, createNewTradeLogError, isNewTradeCreated });
			if (createNewTradeLogError) {
				self.setState({ newTradeLogError: createNewTradeLogError });
			} else {
				console.info(`New Trade created... ${isNewTradeCreated}`);
				this.props.refetchAllTrades();
			}
		}, 1000);
	}

	// setShowUpdateTradeSuccessAlert(status = false) {
	//   this.setState({ showUpdateTradeSuccessAlert: status });
	// }

	async onUpdateNewTradeLog(updatedTradeLog) {
		const { uid: userId } = this.props.user || {};
		const { error, isTradeLogUpdated } = await updateTradeLog(
			updatedTradeLog.tradeId,
			updatedTradeLog,
			userId
		);
		if (error) {
			this.setState({ editTradeLogError: error });
		} else {
			console.info(`Trade updated... ${isTradeLogUpdated}`);
			this.setShowEditTradeFormModal(false);
			// this.setShowUpdateTradeSuccessAlert(true);
			this.props.refetchAllTrades();
		}
	}

	onOpenAddNewTradeForm() {
		this.setShowDailyTradesModal(false);
		this.setShowAddNewTradeFormModal(true);
	}

	onDeleteTradeLog(tradeToDelete) {
		this.setShowDailyTradesModal(false);
		this.setState({
			tradeToDelete,
			showTradeLogDeleteConfirmModal: true,
		});
	}

	onEditTradeLog(tradeToEdit) {
		this.setShowDailyTradesModal(false);
		this.setState({
			tradeToEdit,
			showEditTradeFormModal: true,
		});
	}

	async onConfirmDeleteTrade(tradeToDelete) {
		const { uid: userId } = this.props.user || {};
		const { error, isTradeLogDeleted } = await deleteTradeLog(
			tradeToDelete.tradeId,
			userId
		);
		if (error) {
			this.setState({ deleteTradeLogError: error });
		} else {
			console.info(`Trade deleted... ${isTradeLogDeleted}`);
			this.setShowTradeLogDeleteConfirmModal(false);
			// this.setShowDeleteTradeSuccessAlert(true);
			this.props.refetchAllTrades();
		}
	}

	onNewTradeLogError(error) {
		this.setState({ newTradeLogError: error });
	}

	render() {
		const { allTradeLogs } = this.props;
		const {
			activeDate,
			showDailyTradesModal,
			showAddNewTradeFormModal,
			showEditTradeFormModal,
			newTradeLogError,
			editTradeLogError,
			// showAddNewTradeSuccessAlert,
			tradeToEdit,
			// showUpdateTradeSuccessAlert,
			tradeToDelete,
			showTradeLogDeleteConfirmModal,
			// showDeleteTradeSuccessAlert,
		} = this.state;

		const activeDateDate = getDateFromDate(activeDate).toString(); // i.e., "February"
		const activeMonth = getMonthFromDate(activeDate); // i.e., "February"
		const activeYear = getYearFromDate(activeDate).toString(); // i.e., 2020

		const activeTradeLogs = filterTradesByMonthAndYear(
			allTradeLogs,
			activeMonth,
			activeYear
		);

		const { gains, losses, profit } = getStatsFromTrades(activeTradeLogs);

		console.log({ ...this.props, ...this.state });

		return (
			<article className="MonthlyCalendar">
				<header className="flex py-2 px-2 justify-start items-center flex-wrap">
					<MonthNavigator
						prevMonth={getMonthFromDate(getPrevMonthFromDate(activeDate), {
							short: true,
						})}
						nextMonth={getMonthFromDate(getNextMonthFromDate(activeDate), {
							short: true,
						})}
						onClickOnPrevMonth={this.onClickOnPrevMonth}
						onClickOnNextMonth={this.onClickOnNextMonth}
					/>
					<h1 className="active-date sm:text-2xl text-xl font-medium title-font text-gray-900 text-center mr-3 py-1">
						{' '}
						{activeMonth} {activeDateDate}, {activeYear}{' '}
					</h1>
					<MonthlyStats gains={gains} losses={losses} profit={profit} />
				</header>

				<section>
					<MonthlyCalendarGrid
						{...this.state}
						activeDateDate={activeDateDate}
						activeMonth={activeMonth}
						activeYear={activeYear}
						activeTradeLogs={activeTradeLogs}
						onSelectDay={this.onSelectDay}
					/>
				</section>

				<AddNewTradeBtn
					onClick={() => this.setShowAddNewTradeFormModal(true)}
				/>

				{/* {showAddNewTradeSuccessAlert && (
          <AddNewTradeSuccessAlert />
        )}

        {showUpdateTradeSuccessAlert && (
          <UpdateTradeSuccessAlert />
        )}

        {showDeleteTradeSuccessAlert && (
          <DeleteTradeSuccessAlert />
        )} */}

				{showTradeLogDeleteConfirmModal && (
					<TradeLogDeleteConfirmModal
						tradeToDelete={tradeToDelete}
						onConfirmDeleteTrade={this.onConfirmDeleteTrade}
						onClose={() => this.setShowTradeLogDeleteConfirmModal(false)}
					/>
				)}

				{showDailyTradesModal && (
					<DailyTradesModal
						activeDateDate={activeDateDate}
						activeMonth={activeMonth}
						activeYear={activeYear}
						activeTradeLogs={activeTradeLogs}
						onClose={() => this.setShowDailyTradesModal(false)}
						onOpenAddNewTradeForm={this.onOpenAddNewTradeForm}
						onDeleteTradeLog={this.onDeleteTradeLog}
						onEditTradeLog={this.onEditTradeLog}
					/>
				)}

				{showAddNewTradeFormModal && (
					<AddNewTradeFormModal
						activeDateDate={activeDateDate}
						activeMonth={activeMonth}
						activeYear={activeYear}
						newTradeLogError={newTradeLogError}
						onNewTradeLogError={this.onNewTradeLogError}
						onCreateNewTradeLog={(newTradeLog) =>
							this.onCreateNewTradeLog(newTradeLog)
						}
						onCreateNewTradeLogAndAddMore={(newTradeLog) =>
							this.onCreateNewTradeLogAndAddMore(newTradeLog)
						}
						onClose={() => this.setShowAddNewTradeFormModal(false)}
						isLoading={this.state.isLoading}
					/>
				)}

				{showEditTradeFormModal && (
					<EditTradeFormModal
						tradeToEdit={tradeToEdit}
						editTradeLogError={editTradeLogError}
						onUpdateNewTradeLog={(updatedTradeLog) =>
							this.onUpdateNewTradeLog(updatedTradeLog)
						}
						onClose={() => this.setShowEditTradeFormModal(false)}
					/>
				)}
			</article>
		);
	}
}

export default MonthlyCalendar;
