/**
 * Класс для операций со временем
 */
export class TimeManager {

	/**
	 * Функция получает текущее время
	 * @returns {{hours : number, minutes : number, seconds : number}}
	 */
	static thisTime() {
		return this.prepareDate( new Date() );
	}

	/**
	 * Функция проверяет, находится ли указанное время(time) в нужном интервале (interval)
	 * @param time {Date)
	 * @param interval {Array} - массив из двух дат для сравнения
	 * @returns {boolean}
	 */
	static is_inTimeInterval( time, interval ) {
		// если время для проверки не задано - берем текущее
		if ( undefined === time ) {
			time = this.thisTime();
		}
		if ( !Array.isArray( interval ) ) {
			return false;
		}
		if ( interval.length !== 2 ) {
			return false;
		}
		const higher_time = this.getTime( interval, "higher" );
		const lower_time  = this.getTime( interval, "lower" );
		if ( this.isHigher( higher_time, time ) && this.isLower( lower_time, time ) ) {
			console.log( this.TimeToString( time ) + ' between ' + this.TimeToString( lower_time ) + ' and ' + this.TimeToString( higher_time ) );
			return true;
		}
		console.log( this.TimeToString( time ) + 'not between ' + this.TimeToString( lower_time ) + ' and ' + this.TimeToString( higher_time ) );

		return false;


	}

	/**
	 * Сравнение времени: является ли одно время больше другого?
	 * @param whichTime
	 * @param thanTime
	 * @returns {boolean}
	 */
	static isHigher( whichTime, thanTime ) {

		whichTime = this.TimeToString( whichTime );
		thanTime  = this.TimeToString( thanTime );


		return whichTime > thanTime;
	}
	/**
	 * Сравнение времени, является ли одно время меньше другого?
	 * @param whichTime
	 * @param thanTime
	 * @returns {boolean}
	 */
	static isLower( whichTime, thanTime ) {

		whichTime = this.TimeToString( whichTime );
		thanTime  = this.TimeToString( thanTime );


		return whichTime < thanTime;
	}

	/**
	 * Функция сравнения времени ( без даты)
	 * @param dates
	 * @returns {*}
	 */
	static timeCompare( dates ) {

		if ( !Array.isArray( dates ) ) {
			return false;
		}
		if ( dates.length !== 2 ) {
			return false;
		}
		let dates_to_compare = [];
		let prepared_dates   = [];
		// готовим время в нужном формате
		dates.forEach( ( date, index ) => {

			prepared_dates[ index ]   = this.prepareDate( date );
			dates_to_compare[ index ] = this.TimeToString( prepared_dates[ index ] );


		} );
		// если даты равны
		if ( dates_to_compare[ 0 ] === dates_to_compare[ 1 ] ) {
			return "equal";
		}
		// возвращаем результат сравнения
		return dates_to_compare[ 0 ] > dates_to_compare[ 1 ] ? {
			higher : prepared_dates[ 0 ],
			lower : prepared_dates[ 1 ]
		} : {
			higher : prepared_dates[ 1 ],
			lower : prepared_dates[ 0 ]
		};


	}

	/**
	 * Функция получает большее или меньшее время
	 * @param dates
	 * @param type
	 * @returns {*}
	 */
	static getTime( dates, type ) {
		// доступные типы для получения из массива - большее время и меньшее время
		const available_types = [
			"higher",
			"lower"
		];
		if ( !Array.isArray( dates ) ) {
			return false;
		}
		if ( dates.length !== 2 ) {
			return false;
		}
		if ( available_types.filter( av_type => av_type === type ).length === 0 ) {
			return false;
		}
		return this.timeCompare( dates )[ type ];

	};

	/**
	 * Функция перевода даты в строку
	 * @param date
	 * @returns {string}
	 */
	static TimeToString( date ) {
		// если дата находится не в подходящем формате
		if ( !this.isDatePrepared( date ) ) {
			if ( !date instanceof Date ) {
				return false;
			}
			date = this.prepareDate( date );

		}
		let values = [];
		Object.keys( date ).forEach( key => values.push( this.addZero( date[ key ] ) ) );
		return values.join( ':' );

	}

	/**
	 * Функция проверяет, была ли дата подготовлена
	 * @param date
	 * @returns {boolean}
	 */
	static isDatePrepared( date ) {
		// требуемые свойства
		const properties = [
			"hours",
			"minutes",
			"seconds"
		];
		let errors       = 0;
		properties.forEach( value => {
			if ( date.hasOwnProperty( value ) ) {
				if ( "number" === typeof date[ value ] ) {
					return;
				}

			}
			errors++;

		} );
		return errors === 0;
	}

	/**
	 * Функция добавляет ведущий ноль
	 * @param value
	 * @returns {string}
	 */
	static addZero( value ) {
		return value < 10 ? ('0' + value) : value;
	}

	/**
	 * Приведение даты к нужному формату
	 * @param date
	 * @returns {*}
	 */
	static prepareDate( date ) {
		// если передана некорректная дата
		if ( !date instanceof Date ) {
			return false;
		}

		return {
			hours : date.getHours(),
			minutes : date.getMinutes(),
			seconds : date.getSeconds()
		};

	}

}