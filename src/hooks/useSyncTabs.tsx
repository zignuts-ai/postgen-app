import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type UseSyncTabsParamsOptions = {
  paramName: string // The name of the URL parameter to sync with
  defaultValue: string // Default value for the tab state
}

export const useSyncTabs = ({ paramName, defaultValue }: UseSyncTabsParamsOptions) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>(defaultValue)

  // Helper function to get the value from URL params
  const getTabFromParams = () => {
    return searchParams.get(paramName) || defaultValue
  }

  // Sync the activeTab state with the URL params
  useEffect(() => {
    const tabFromParams = getTabFromParams()
    if (tabFromParams !== activeTab) {
      setActiveTab(tabFromParams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]) // Runs when URL search changes

  // Update the URL params when the active tab changes
  useEffect(() => {
    const currentTab = getTabFromParams()
    if (activeTab !== currentTab) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set(paramName, activeTab)
      router.push(`?${newSearchParams.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  return { activeTab, setActiveTab }
}
