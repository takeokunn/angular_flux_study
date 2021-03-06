import BaseStore from '../base/base.store';

class NavbarStore extends BaseStore {

	constructor($log, NavbarConst, ApiService, AuthService, Dispatcher) {

		'ngInject';

		super();

		this._log        = $log.debug;
		this._const      = NavbarConst;
		this._api        = ApiService;
		this._auth       = AuthService;
		this._dispatcher = Dispatcher;

		this._registerCallbacks();
	}

	// private methods
	_registerCallbacks() {
		this._dispatcher.register_(this._const.LOGOUT, this.logout_.bind(this));
	}

	// public methods
	logout_() {

		let self = this;

		self._api.auth_().logout_( {},
			() => {
				self._auth.logout_();
				self.emitChange_(self._const.LOGOUT_SUCCESS);
			},
			() => {
				self.emitChange_(self._const.LOGOUT_FAILURE);
			}
		);
	}
}

export default NavbarStore;
