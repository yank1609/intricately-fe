<template>
  <div class="company-data">
    <p class="description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar eu mauris in elementum. Nunc molestie ante eros, non ornare est finibus aliquam.
    </p>

    <form>
      <div class="form-group layout-container">
        <div class="layout-item--6of12">
          <label class="form-label">company name</label>
          <input 
            v-model="form.name" 
            v-validate 
            :class="{'error': errors.has('name')}"
            name="name"
            type="text" 
            class="form-input"
            @input="submit({
              key: 'name',
              name: 'name',
              val: form.name
            })"
            placeholder="e.g. Your Company Name" 
            data-vv-as="Company name" 
            data-vv-rules="required" />

            <span 
              class="text-error" 
              v-if="errors.has('name')">
              {{ errors.first('name') }}
            </span>
        </div>
      </div>

      <div class="form-group layout-container">
        <div class="layout-item--6of12">
          <label class="form-label">company spend</label>
          <input 
            v-validate 
            v-model="form.spend.masked" 
            :class="{'error': errors.has('spend')}"
            name="spend"
            type="text" 
            class="form-input" 
            placeholder="e.g. $150,000"
            data-vv-as="Company spend" 
            data-vv-rules="required" />

            <span 
              class="text-error" 
              v-if="errors.has('spend')">
              {{ errors.first('spend') }}
            </span>
        </div>
      </div>

      <div class="form-group layout-container">
        <div class="layout-item--6of12">
          <label class="form-label">company spend minimum ability</label>
          <input 
            v-validate="minSpendAbilityRules"
            v-model="form.spendAbility.min.masked" 
            :class="{'error': errors.has('spend_min')}"
            name="spend_min"
            type="text" 
            class="form-input" 
            placeholder="e.g. $150,000"
            data-vv-as="Company spend minimum ability" />
          <span 
            class="text-error" 
            v-if="errors.has('spend_min')">
            {{ errors.first('spend_min') }}
          </span>
        </div>

        <div class="layout-item--6of12">
          <label class="form-label">company spend maximum ability</label>
          <input 
            v-validate="maxSpendAbilityRules"
            v-model="form.spendAbility.max.masked" 
            :class="{'error': errors.has('spend_max')}"
            name="spend_max"
            type="text" 
            class="form-input" 
            placeholder="e.g. $300,000"
            data-vv-as="Company spend maximum ability" />
          <span 
            class="text-error" 
            v-if="errors.has('spend_max')">
            {{ errors.first('spend_max') }}
          </span>
        </div>
      </div>

      <div class="form-group layout-container">
        <div class="layout-item--12of12">
          <label class="form-label">notes</label>
          <textarea 
            :value="form.note.real"
            class="form-input" 
            placeholder="e.g. Good Tech Company"
            @click="toggleModal(true)"
            data-vv-as="Note" readonly></textarea>
          <span 
            class="text-error" 
            v-if="errors.has('spend_max')">
            {{ errors.first('spend_max') }}
          </span>
        </div>
      </div>
    </form>

    <modal :yesOnly="true" yesButtonText="SAVE" @yesAction="saveNote" :displayed.sync="modalDisplay">
      <slot>
        <div class="form-group layout-container margin--0">
          <div class="layout-item--12of12 padding--0">
            <label class="form-label margin-bottom--2">additional notes</label>
            <textarea 
              v-validate
              v-model="form.note.tmp"
              :class="{'error': errors.has('note')}"
              name="note"
              class="form-input" 
              placeholder="e.g. Good Tech Company"
              data-vv-as="Note"
              data-vv-rules="required"></textarea>
            <span 
              class="text-error" 
              v-if="errors.has('note')">
              {{ errors.first('note') }}
            </span>
          </div>
        </div>
      </slot>
    </modal>
  </div>
</template>

<script>
import numeral from 'numeral'

import Modal from 'Components/Modal'
import { clearTimeout } from 'timers';

export default {
  components: {
    Modal
  },
  data () {
    return {
      modalDisplay: false,
      timeout: {},
      form: {
        name: null,
        note: {
          tmp: null,
          real: null
        },
        spend: {
          masked: null,
          raw: 0
        },
        spendAbility: {
          min: {
            masked: null,
            raw: 0
          },
          max: {
            masked: null,
            raw: 0
          }
        }
      }
    }
  },
  computed: {
    minSpendAbilityRules () {
      return {
        required_max_value: this.form.spendAbility.max.raw
      }
    },
    maxSpendAbilityRules () {
      return {
        required_min_value: this.form.spendAbility.min.raw
      }
    }
  },
  watch: {
    'form.spend.masked': {
      handler (val) {
        if (this.isBlank(val)) {
          this.$set(this.form.spend, 'raw', null);
        } else {
          this.$set(this.form.spend, 'masked', numeral(val).format('$0,0'));
          this.$set(this.form.spend, 'raw', numeral(val, '$0,0').value());

          this.$nextTick(() => {
            this.submit({
              name: 'spend',
              key: 'spend',
              val: this.form.spend.raw
            })
          })
        }
      }
    },
    'form.spendAbility.min.masked': {
      handler (val) {
        if (this.isBlank(val)) {
          this.$set(this.form.spendAbility.min, 'raw', null);
        } else {
          this.$set(this.form.spendAbility.min, 'masked', numeral(val).format('$0,0'));
          this.$set(this.form.spendAbility.min, 'raw', numeral(val, '$0,0').value());

          this.$nextTick(() => {
            this.submit({
              name: 'spend_min',
              key: 'spendAbility',
              subkey: 'min',
              val: this.form.spendAbility.min.raw
            })
          })
        }
      }
    },
    'form.spendAbility.max.masked': {
      handler (val) {
        if (this.isBlank(val)) {
          this.$set(this.form.spendAbility.max, 'raw', null);
        } else {
          this.$set(this.form.spendAbility.max, 'masked', numeral(val).format('$0,0'));
          this.$set(this.form.spendAbility.max, 'raw', numeral(val, '$0,0').value());
          
          this.$nextTick(() => {
            this.submit({
              name: 'spend_max',
              key: 'spendAbility',
              subkey: 'max',
              val: this.form.spendAbility.max.raw
            })
          })
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setData();
    })
  },
  methods: {
    toggleModal (val) {
      this.modalDisplay = val

      if (val) {
        this.$set(this.form.note, 'tmp', this.form.note.real)
      }    
    },
    saveNote () {
      this.$validator.validate('note', this.form.note.tmp).then(res => {
        if (res) {
          this.$set(this.form.note, 'real', this.form.note.tmp)
          this.$store.commit('updateCompany', {
            note: this.form.note.tmp
          })
          this.toggleModal(false)
        }
      })
    },
    setData () {
      const companyData = this.$store.state.companyData
      this.$set(this, 'form', {
        name: companyData.name,
        note: {
          tmp: companyData.note,
          real: companyData.note
        },
        spend: {
          masked: companyData.spend ? numeral(companyData.spend).format('$0,0') : null,
          raw: companyData.spend
        },
        spendAbility: {
          min: {
            masked: companyData.spendAbility.min ? numeral(companyData.spendAbility.min).format('$0,0') : null,
            raw: companyData.spendAbility.min
          },
          max: {
            masked:companyData.spendAbility.max ? numeral(companyData.spendAbility.max).format('$0,0') : null,
            raw: companyData.spendAbility.max
          }
        }
      })
    },
    submit (args = {}) {
      if (this.isBlank(args.val)) return

      if (this.timeout[args.key]) {
        window.clearTimeout(this.timeout[args.key])
      }

      this.timeout[args.key] = window.setTimeout(() => {
        let tmp = {}
        
        tmp[args.key] = {}

        if (args.key === 'spendAbility') {
          tmp[args.key] = {
            max: this.form.spendAbility.max.raw,
            min: this.form.spendAbility.min.raw
          }
        }

        if (!args.subkey) {
          tmp[args.key] = args.val
        } else {
          
          tmp[args.key][args.subkey] = args.val
        }

        this.$validator.validate(args.name, args.val).then(res => {
          if (res) {
            this.$store.commit('updateCompany', tmp)
          }
        })
      }, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~Styles/setting';

  .company-data {
    border: 1px solid #d5d9e3;
    min-height: 1px;
    padding: 2 * $width-multiplier;
    border-radius: 4px;
  }

  p.description {
    margin-top: 0px;
  }
</style>
